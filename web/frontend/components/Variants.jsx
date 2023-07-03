import {IndexTable, LegacyCard, TextField} from "@shopify/polaris"

export const Variants = ({variants, updateVariant}) => {
    return (
        <LegacyCard sectioned title="Variants">
            <IndexTable
                itemCount={variants.length}
                resourceName={{singular: 'variant', plural: 'variants'}}
                headings={[{title: 'Variant'}, {title: 'Price'}]}
                selectable={false}
            >
                {
                    variants.map((variant) => (
                        <IndexTable.Row>
                            <IndexTable.Cell>
                                <TextField
                                    value={variant.title}
                                    disabled
                                    readOnly
                                    label="Variant"
                                    labelHidden
                                />
                            </IndexTable.Cell>
                            <IndexTable.Cell>
                                <TextField
                                    value={variant.price || 0}
                                    type="number"
                                    prefix="₺"
                                    label="Price"
                                    labelHidden
                                    onChange={price => updateVariant(variant.id, price)}
                                />
                            </IndexTable.Cell>
                        </IndexTable.Row>
                    ))
                }
            </IndexTable>
        </LegacyCard>
    )
}
