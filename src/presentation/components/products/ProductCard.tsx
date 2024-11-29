import { Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Card, Text } from "@ui-kitten/components";
import type { Product } from "../../../domain/entities/product"
import { FadeInImage } from "../ui/FadeInImage";
import { RootStackParams } from "../../navigation/StackNavigator";

interface Props {
 product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>()

  return (
    <Card
      style={{ flex: 1, backgroundColor: '#f9f9f9', margin: 3 }}
      onPress={() => navigation.navigate('ProductScreen', { productId: product.id })}
    >
      {
        product.images.length === 0
          ? (
            <Image
              source={ require('../../../assets/no-product-image.png') }
              style={{ width: '100%', height: 200 }}
            />
          )
          : (
            <FadeInImage
              uri={ product.images[0] }
              style={{ flex: 1, height: 200, width: '100%' }}
            />
          )
      }

      <Text
        numberOfLines={2}
        style={{ textAlign: 'center' }}
      >{ product.title }</Text>
    </Card>
  )
}
