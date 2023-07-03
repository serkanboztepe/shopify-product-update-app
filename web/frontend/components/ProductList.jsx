import {
    Layout,
    Spinner,
    LegacyCard,
    EmptyState
} from "@shopify/polaris";
import {ProductCard} from "./ProductCard.jsx";

export const ProductList = ({data, isLoading, isRefetching})  => {
    if (isLoading || isRefetching) {
        return (
            <Layout>
                <Spinner />
            </Layout>
        )
    }

    return <Layout>
        {
            data?.length ? data.map((product, index) => (
                <Layout.Section key={index}>
                    <ProductCard
                        { ...product }
                    />
                </Layout.Section>
            )) : (
                <Layout.Section>
                    <LegacyCard>
                        <EmptyState
                            heading="No Products Found"
                            image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                        >
                            <p>Add products using the card abovee</p>
                        </EmptyState>
                    </LegacyCard>
                </Layout.Section>
            )
        }
    </Layout>
}
