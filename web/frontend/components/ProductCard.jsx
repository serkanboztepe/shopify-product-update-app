import {Button, Collapsible, FormLayout, Grid, LegacyCard, TextField} from "@shopify/polaris"
import {useState} from "react"
import {useAuthenticatedFetch} from "../hooks"
import {Toast} from "@shopify/app-bridge-react";
import {Variants} from "./Variants.jsx";

export const ProductCard = (props) => {
    const emptyToastProps = { content: null };
    const [toastProps, setToastProps] = useState(emptyToastProps);

    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState(props.title);
    const [description, setDescription] = useState(props.body_html || "");

    const [showVariants, setShowVariants] = useState(false);
    const [variants, setVariants] = useState(props.variants);


    const updateVariant = (id, price) => {
        setVariants(prev => {
            return prev.map((variant) => {
                if (id === variant.id) {
                    return {...variant, price};
                }
                return variant;
            });
        })
    }

    const fetch = useAuthenticatedFetch();

    const toastMarkup = toastProps.content && (
        <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
    );

    return (
        <>
            {toastMarkup}
            <LegacyCard
                sectioned
                primaryFooterAction={{
                    content: "Update Product",
                    onAction: async () => {
                        setIsLoading(true);
                        const response = await fetch(`/api/products/${props.id}`,  {
                            method: "PUT",
                            body: JSON.stringify({
                                title,
                                body_html: description,
                                variants
                            })
                        })

                        if (response.ok) {
                            setToastProps({
                                content: "Product Updated",
                            });
                        } else {
                            setToastProps({
                                content: "Error",
                                error: true
                            });
                        }
                        setIsLoading(false);
                    },
                    loading: isLoading
                }}
                secondaryFooterActions={[{
                    content: "View In Admin",
                    onAction: () => console.log("View Product")
                }]}
            >
                <Grid>
                    <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                        <img width={300} src={props.image?.src} alt="Image"/>
                    </Grid.Cell>
                    <Grid.Cell columnSpan={{xs: 6, sm: 3, md: 3, lg: 6, xl: 6}}>
                        <FormLayout>
                            <TextField
                                label="Product Title"
                                value={title}
                                onChange={setTitle}
                            />
                            <TextField
                                multiline={5}
                                label="Product Description"
                                value={description}
                                onChange={setDescription}
                            />
                            <Button onClick={() => setShowVariants(!showVariants)}>Show Variant</Button>
                            <Collapsible id={`product-variants-${props.id}`} open={showVariants}>
                                <Variants variants={variants} updateVariant={updateVariant} />
                            </Collapsible>
                        </FormLayout>
                    </Grid.Cell>
                </Grid>
            </LegacyCard>
        </>
    )
}
