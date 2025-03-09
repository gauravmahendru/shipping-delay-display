import React from 'react';
import {
  reactExtension,
  Text,
  BlockStack,
  InlineStack,
  Icon,
  useCartLines
} from '@shopify/ui-extensions-react/checkout';

// Modern checkout extension implementation
export default reactExtension('purchase.checkout.block.render', () => <ShippingDelayExtension />);

function ShippingDelayExtension() {
  // Get cart lines
  const cartLines = useCartLines();
  
  console.log('Extension loaded, cart lines:', cartLines);
  
  // Check if we have any cart lines with shipping delay info
  const itemsWithDelay = cartLines.filter(line => {
    console.log('Line:', line.merchandise.title);
    console.log('Metafield:', line.merchandise?.product?.metafield);
    return line.merchandise?.product?.metafield?.value;
  });
  
  console.log('Items with delay info:', itemsWithDelay.length);
  
  // If no shipping delay information, don't render anything
  if (itemsWithDelay.length === 0) {
    // For testing, still render something so we know the extension loads
    return (
      <BlockStack spacing="base" padding="base" border="base">
        <Text size="medium" emphasis="bold">Shipping Information</Text>
        <Text>All items typically ship within 3-5 business days.</Text>
      </BlockStack>
    );
  }
  
  return (
    <BlockStack spacing="base" padding="base" border="base">
      <Text size="medium" emphasis="bold">Shipping Information</Text>
      {itemsWithDelay.map(line => (
        <InlineStack key={line.id} spacing="base" alignment="center">
          <Icon source="truck" />
          <Text>
            <Text emphasis="bold">{line.merchandise.title}: </Text>
            {line.merchandise.product.metafield.value}
          </Text>
        </InlineStack>
      ))}
    </BlockStack>
  );
}
