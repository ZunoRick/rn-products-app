import { useRef } from "react";
import { FlatList } from "react-native";
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from "@ui-kitten/components"
import { ScrollView } from "react-native-gesture-handler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { StackScreenProps } from "@react-navigation/stack"
import { MainLayout } from '../../layouts/MainLayput';
import { getProductById } from "../../../actions/products/get-product-by-id"
import { RootStackParams } from "../../navigation/StackNavigator"
import { FadeInImage } from "../../components/ui/FadeInImage";
import { Gender, Product, Size } from "../../../domain/entities/product";
import { MyIcon } from "../../components/ui/MyIcon";
import { Formik } from "formik";
import { updateCreateProduct } from "../../../actions/products/update-create-product";

const sizes: Size[] = [Size.Xs, Size.S, Size.M, Size.L, Size.Xl, Size.Xxl]
const genders: Gender[] = [Gender.Kid, Gender.Men, Gender.Women, Gender.Unisex]

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: Props) => {
  const productIdRef = useRef(route.params.productId)
  const theme = useTheme()
  const queryClient = useQueryClient()

  const { data: product } = useQuery({
    queryKey: ['product', productIdRef.current],
    staleTime: 1000 * 60 * 60,
    queryFn: () => getProductById(productIdRef.current)
  })

  const mutation = useMutation({
    mutationFn: (data: Product) =>
      updateCreateProduct({...data, id: productIdRef.current}),
      onSuccess(data: Product) {
        productIdRef.current = data.id; // creación

        queryClient.invalidateQueries({queryKey: ['products', 'infinite']});
        queryClient.invalidateQueries({queryKey: ['product', data.id]});
        // queryClient.setQueryData(['product',  data.id ], data);
      },
  });

  if (!product) {
    return <MainLayout title="Cargando..."/>
  }
  
  return (
    <Formik
      initialValues={ product }
      onSubmit={ values => console.log(values) }
    >
      {
        ({ handleChange, handleSubmit, values, errors, setFieldValue }) => (
          <MainLayout
            title={ values.title }
            subtitle={ `Precio: $${ values.price }` }
          >
            <ScrollView style={{ flex: 1 }}>
              {/* Imagenes del producto */}
              <Layout>
                {/* TODO tener en concideración cuando no hay ima´genes */}
                <FlatList
                  data={ values.images }
                  keyExtractor={ (item) => item }
                  horizontal
                  showsHorizontalScrollIndicator={ false }
                  renderItem={({ item }) => (
                    <FadeInImage
                      uri={ item }
                      style={{ width: 300, height: 300, marginHorizontal: 7 }}
                    />
                  )}
                />
              </Layout>

              {/* Formulario */}
              <Layout style={{ marginHorizontal: 10 }}>
                <Input
                  label='Título'
                  value={ values.title }
                  style={{ marginVertical: 5 }}
                  onChangeText={ handleChange('title') }
                />

                <Input
                  label='Slug'
                  value={ values.slug }
                  style={{ marginVertical: 5 }}
                  onChangeText={ handleChange('slug') }
                />

                <Input
                  label='Descripción'
                  value={ values.description }
                  multiline
                  numberOfLines={5}
                  style={{ marginVertical: 5 }}
                  onChangeText={ handleChange('description') }
                />
              </Layout>

              {/* Precio e Inventario */}
              <Layout style={{ marginVertical: 5,  marginHorizontal: 15, flexDirection: 'row', gap: 10 }}>
                <Input
                  label='Precio'
                  value={ values.price.toString() }
                  style={{ flex: 1 }}
                  onChangeText={ handleChange('price') }
                />

                <Input
                  label='Inventario'
                  value={ values.stock.toString() }
                  style={{ flex: 1 }}
                  onChangeText={ handleChange('stock') }
                />
              </Layout>

              {/* Selectores */}
              <ButtonGroup
                style={{ margin: 2, marginTop: 20, marginHorizontal: 20 }}
                size="small"
                appearance="outline"
              >
                {
                  sizes.map((size) => 
                    <Button
                      key={size}
                      onPress={() => setFieldValue(
                        'sizes',
                        values.sizes.includes(size)
                          ? values.sizes.filter(s => s !== size)
                          : [...values.sizes, size]
                      )}
                      style={{
                        flex: 1,
                        backgroundColor:
                          values.sizes.includes(size)
                          ? theme['color-primary-200']
                          : undefined
                      }}
                    >
                      {size}
                    </Button>
                  )
                }
              </ButtonGroup>

              {/* Genders */}
              <ButtonGroup
                style={{ margin: 2, marginTop: 20, marginHorizontal: 20 }}
                size="small"
                appearance="outline"
              >
                {
                  genders.map((gender) => 
                    <Button
                      key={gender}
                      onPress={() => setFieldValue('gender', gender)}
                      style={{
                        flex: 1,
                        backgroundColor:
                          values.gender.startsWith(gender)
                          ? theme['color-primary-200']
                          : undefined
                      }}
                    >
                      {gender}
                    </Button>
                  )
                }
              </ButtonGroup>

              {/* Bottón Guardar */}
              <Button
                accessoryLeft={ <MyIcon name="save-outline" white/> }
                onPress={() => console.log('Guardar')}
                style={{ margin: 15 }}
              >
                Guardar
              </Button>

              <Text>{ JSON.stringify(values, null, 2) }</Text>
              
              <Layout style={{ height: 200 }} />
            </ScrollView>
          </MainLayout>
        )
      }
    </Formik>
  )
}
