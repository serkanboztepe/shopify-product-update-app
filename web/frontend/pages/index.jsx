import {
  Page,
  Layout,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

import {ProductList, ProductsCard} from "../components";
import {useAppQuery} from "../hooks/index.js";


export default function HomePage() {

    const { data, isLoading, isRefetching } = useAppQuery({
        url: "/api/products",
    });

  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
          <Layout.Section>
            <ProductList
                data={data?.products}
                isLoading={isLoading}
                isRefetching={isRefetching}
            />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
