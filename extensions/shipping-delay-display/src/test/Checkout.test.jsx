import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import ShippingDelayDisplay from '../index';
// Mock the Shopify Checkout UI extensions API
vi.mock('@shopify/checkout-ui-extensions-react', () => {
  return {
    useExtensionApi: vi.fn(() => ({
      extensionPoint: 'Checkout::CartLines::RenderAfter',
      lineItems: [
        {
          id: 'line-item-1',
          merchandise: {
            title: 'Test Product 1',
            product: {
              metafield: {
                value: 'Ships in 3-5 business days'
              }
            }
          }
        },
        {
          id: 'line-item-2',
          merchandise: {
            title: 'Test Product 2',
            product: {
              metafield: null
            }
          }
        },
        {
          id: 'line-item-3',
          merchandise: {
            title: 'Test Product 3',
            product: {
              metafield: {
                value: 'Ships in 1-2 business days'
              }
            }
          }
        }
      ]
    })),
    render: vi.fn(),
    BlockStack: ({ children }) => <div data-testid="block-stack">{children}</div>,
    InlineStack: ({ children }) => <div data-testid="inline-stack">{children}</div>,
    Icon: ({ source }) => <span data-testid={`icon-${source}`}></span>,
    Text: ({ children, emphasis, size }) => <span data-testid={`text-${emphasis || 'normal'}-${size || 'default'}`}>{children}</span>,
    Divider: () => <hr data-testid="divider" />,
    Spinner: () => <div data-testid="spinner">Loading...</div>
  };
});

describe('ShippingDelayDisplay', () => {
  beforeEach(() => {
    // Clear any previous renders
    vi.clearAllMocks();
  });

  it('displays shipping delay information for products with metafields', () => {
    render(<ShippingDelayDisplay />);
    
    // Check heading is present
    expect(screen.getByText('Shipping Information')).toBeInTheDocument();
    
    // Check products with metafields are displayed
    expect(screen.getByText('Test Product 1:')).toBeInTheDocument();
    expect(screen.getByText('Ships in 3-5 business days')).toBeInTheDocument();
    expect(screen.getByText('Test Product 3:')).toBeInTheDocument();
    expect(screen.getByText('Ships in 1-2 business days')).toBeInTheDocument();
    
    // Check product without metafield is not displayed
    expect(screen.queryByText('Test Product 2:')).not.toBeInTheDocument();
  });
  
  it('displays the truck icon for each product with shipping delay', () => {
    render(<ShippingDelayDisplay />);
    
    // Two products with metafields should have two truck icons
    const truckIcons = screen.getAllByTestId('icon-truck');
    expect(truckIcons).toHaveLength(2);
  });
  
  it('handles empty metafield data gracefully', () => {
    // Override the mock to return no valid metafields
    vi.mocked(useExtensionApi).mockReturnValue({
      extensionPoint: 'Checkout::CartLines::RenderAfter',
      lineItems: [
        {
          id: 'line-item-1',
          merchandise: {
            title: 'Test Product 1',
            product: {
              metafield: null
            }
          }
        }
      ]
    });
    
    const { container } = render(<ShippingDelayDisplay />);
    
    // Component should render nothing when no products have metafields
    expect(container.firstChild).toBeNull();
  });
});
