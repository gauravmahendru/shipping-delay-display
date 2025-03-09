# Checkout UI Extension

Checkout UI extensions let app developers build custom functionality that merchants can install at defined targets in the checkout flow. You can learn more about checkout UI extensions in Shopify’s [developer documentation](https://shopify.dev/api/checkout-extensions/checkout).

## Prerequisites

Before you start building your extension, make sure that you’ve created a [development store](https://shopify.dev/docs/apps/tools/development-stores) with the [checkout extensibility developer preview](https://shopify.dev/docs/api/release-notes/developer-previews#previewing-new-features).

## Your new Extension

Your new extension contains the following files:

- `README.md`, the file you are reading right now.
- `shopify.extension.toml`, the configuration file for your extension. This file defines your extension’s name, where it will appear in the checkout, and other metadata.
- `src/Checkout.jsx`, the source code for your extension.
- `locales/en.default.json` and `locales/fr.json`, which contain translations used to [localized your extension](https://shopify.dev/docs/apps/checkout/best-practices/localizing-ui-extensions).

By default, your extension is configured to target the `purchase.checkout.block.render` [extension target](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview). You will find the target both in your `shopify.extension.toml`, and in the source code of your extension. The default target allows the merchant to configure where in the checkout *they* want your extension to appear. If you are building an extension that is tied to existing UI element in the checkout, such as the cart lines or shipping options, you can change the extension target so that your UI extension will render in the correct location. Check out the list of [all available extension targets](https://shopify.dev/docs/api/checkout-ui-extensions/extension-targets-overview) to get some inspiration for the kinds of content you can provide with checkout UI extensions.

To build your extension, you will need to use APIs provided by Shopify that let you render content, and to read and write data in the checkout. The following resources will help you get started with checkout extensions:

- [APIs by extension target](https://shopify.dev/docs/api/checkout-ui-extensions/targets)
- [All APIs for reading and writing checkout data](https://shopify.dev/docs/api/checkout-ui-extensions/apis)
- [Available components and their properties](https://shopify.dev/docs/api/checkout-ui-extensions/components)

## Useful Links

- [Checkout app documentation](https://shopify.dev/apps/checkout)
- [Checkout UI extension documentation](https://shopify.dev/api/checkout-extensions)
  - [Configuration](https://shopify.dev/docs/api/checkout-ui-extensions/configuration)
  - [Extension Targets](https://shopify.dev/docs/api/checkout-ui-extensions/targets)
  - [API Reference](https://shopify.dev/docs/api/checkout-ui-extensions/apis)
  - [UI Components](https://shopify.dev/docs/api/checkout-ui-extensions/components)
- [Checkout UI extension tutorials](https://shopify.dev/docs/apps/checkout)
  - [Enable extended delivery instructions](https://shopify.dev/apps/checkout/delivery-instructions)
  - [Creating a custom banner](https://shopify.dev/apps/checkout/custom-banners)
  - [Thank you and order status pages](https://shopify.dev/docs/apps/checkout/thank-you-order-status)
  - [Adding field validation](https://shopify.dev/apps/checkout/validation)
  - [Localizing an extension](https://shopify.dev/apps/checkout/localize-ui-extensions)


# Updated README from GAURAV MAHENDRU

# Shipping Delay Display - Shopify Checkout UI Extension

## Overview

This Shopify Checkout UI extension enhances the checkout experience by displaying product-specific shipping delay information to customers during checkout. It leverages custom product metafields to provide accurate delivery expectation messaging for each item in the cart.

## Features

- Displays shipping delay information for each product during checkout
- Automatically fetches and renders metafield data (`product.shipping_delay`)
- Clean, unobtrusive design that integrates seamlessly with the Shopify checkout flow
- Handles edge cases (missing metafields, loading states, multiple products)
- Fully tested with comprehensive unit tests

## Technical Architecture

### Extension Points

This extension attaches to the following checkout extension point:
- `Checkout::CartLines::RenderAfter` - Displays shipping information after the cart line items

### Metafield Requirements

The extension relies on the following product metafield:
- Namespace: `product`
- Key: `shipping_delay`
- Type: Single line text
- Example value: "Ships in 3-5 business days"

## Installation & Setup

### Prerequisites

- Shopify Partner account
- Development store with "Checkout Extensibility" developer preview enabled
- Node.js (latest LTS version recommended)
- npm or yarn

### Initial Setup

1. Clone this repository
   ```bash
   git clone <repository-url>
   cd checkout-shipping-delay
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Connect to your development store
   ```bash
   npm run shopify login
   ```

### Local Development

Run the extension in development mode:
```bash
npm run dev
```

### Testing

Run the test suite:
```bash
npm run test
```

### Deployment

Deploy the extension to your Shopify development store:
```bash
npm run deploy
```

## Implementation Details

### Component Structure

The main extension component (`ShippingDelayDisplay`) performs these key functions:
1. Extracts shipping delay metafield data from cart line items
2. Filters out products without shipping delay information
3. Renders a clean, user-friendly display of shipping information
4. Handles edge cases like missing data and loading states

### Code Quality Measures

This project follows best practices for Shopify extension development:
- Clean, reusable React components
- Comprehensive JSDoc documentation
- Error handling for edge cases
- Unit tests with high code coverage
- Modern ES6+ syntax
- Consistent code style and formatting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

Created by GAURAV MAHENDRU 2025
