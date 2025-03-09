import React, { useMemo, useState, useEffect } from 'react';
import {
  useExtensionApi,
  render,
  Divider, 
  Spinner, 
  reactExtension,
  Banner,
  BlockStack,
  InlineStack,
  Icon,
  Checkbox,
  Text,
  useApi,
  useApplyAttributeChange,
  useInstructions,
  useTranslate,
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension("purchase.checkout.block.render", () => (
  <Extension />
));

function Extension() {
  const translate = useTranslate();
  const { extension } = useApi();
  const instructions = useInstructions();
  const applyAttributeChange = useApplyAttributeChange();


  // 2. Check instructions for feature availability, see https://shopify.dev/docs/api/checkout-ui-extensions/apis/cart-instructions for details
  if (!instructions.attributes.canUpdateAttributes) {
    // For checkouts such as draft order invoices, cart attributes may not be allowed
    // Consider rendering a fallback UI or nothing at all, if the feature is unavailable
    return (
      <Banner title="shipping-delay-display" status="warning">
        {translate("attributeChangesAreNotSupported")}
      </Banner>
    );
  }

  // 3. Render a UI
  return (
    <BlockStack border={"dotted"} padding={"tight"}>
      <Banner title="shipping-delay-display">
        {translate("welcome", {
          target: <Text emphasis="italic">{extension.target}</Text>,
        })}
      </Banner>
      <Checkbox onChange={onCheckboxChange}>
        {translate("iWouldLikeAFreeGiftWithMyOrder")}
      </Checkbox>
    </BlockStack>
  );

  async function onCheckboxChange(isChecked) {
    // 4. Call the API to modify checkout
    const result = await applyAttributeChange({
      key: "requestedFreeGift",
      type: "updateAttribute",
      value: isChecked ? "yes" : "no",
    });
    console.log("applyAttributeChange result", result);
  }
}

/**
 * ShippingDelayDisplay Component
 * 
 * Displays product-specific shipping delay information during checkout
 * based on custom metafield values.
 * 
 * @returns {React.Component} - React component
 */
function ShippingDelayDisplay() {
  // Access the Checkout API
  const { extensionPoint, lineItems } = useExtensionApi();
  
  // Component state
  const [isLoading, setIsLoading] = useState(true);
  const [itemsWithDelay, setItemsWithDelay] = useState([]);
  
  // Process line items to extract shipping delay information
  useEffect(() => {
    const processLineItems = () => {
      try {
        // Filter and map through line items to extract relevant information
        const processedItems = lineItems
          .filter(item => {
            // Check if the item has a shipping delay metafield with a value
            return item.merchandise?.product?.metafield?.value;
          })
          .map(item => ({
            id: item.id,
            title: item.merchandise.title,
            delayMessage: item.merchandise.product.metafield.value,
          }));
        
        setItemsWithDelay(processedItems);
      } catch (error) {
        console.error('Error processing line items:', error);
        // In case of error, set empty array to avoid UI issues
        setItemsWithDelay([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Process the line items
    processLineItems();
  }, [lineItems]);
  
  // If loading, show a loading indicator
  if (isLoading) {
    return (
      <BlockStack spacing="loose" alignment="center">
        <Spinner size="small" />
        <Text size="small">Loading shipping information...</Text>
      </BlockStack>
    );
  }
  
  // If no products have shipping delay information, don't render anything
  if (itemsWithDelay.length === 0) {
    return null;
  }
  
  return (
    <BlockStack spacing="base" padding="base">
      <Divider />
      <BlockStack spacing="tight">
        <Text size="medium" emphasis="bold">Shipping Information</Text>
        {itemsWithDelay.map(item => (
          <InlineStack key={item.id} spacing="tight" alignment="center" padding="base">
            <Icon source="truck" />
            <Text size="small">
              <Text emphasis="bold" size="small">{item.title}: </Text> 
              {item.delayMessage}
            </Text>
          </InlineStack>
        ))}
      </BlockStack>
      <Divider />
    </BlockStack>
  );
}

// Register the extension - renders the component at the specified extension point
render('Checkout::CartLines::RenderAfter', () => <ShippingDelayDisplay />);
