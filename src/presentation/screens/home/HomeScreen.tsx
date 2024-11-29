import { useInfiniteQuery } from "@tanstack/react-query"
import { useAuthStore } from "../../store/auth/useAuthStore"
import { getProductsByPage } from "../../../actions/products/get-products-by-page"
import { MainLayout } from "../../layouts/MainLayput"
import { FullScreenLoader } from "../../components/ui/FullScreenLoader"
import { ProductList } from "../../components/products/ProductList"
import { FAB } from "../../components/ui/FAB"

export const HomeScreen = () => {
  const { logout } = useAuthStore()
  // const { isLoading, data: products = [] } = useQuery({
  //   queryKey: ['products', 'infinite'],
  //   staleTime: 1000 * 60 * 60,
  //   queryFn: () => getProductsByPage(0)
  // })

  const { isLoading, data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    staleTime: 1000 * 60 * 60,
    initialPageParam: 0,
    queryFn: async (params) => await getProductsByPage(params.pageParam),
    getNextPageParam: (allPages) => allPages.length,
  })

  return (
    <>
      <MainLayout
        title="TesloShop - Products"
        subtitle="Aplicación Administrativa"
      >
        {
          isLoading
            ? (<FullScreenLoader/>)
            : (
              <ProductList
                products={ data?.pages.flat() ?? [] }
                fetchNextPage={ fetchNextPage }
              />
            )
        }
      </MainLayout>

      <FAB
        icon="plus-outline"
        style={{ 
          position: 'absolute',
          bottom: 30,
          right: 20,
        }}
      />
    </>
  )
}
