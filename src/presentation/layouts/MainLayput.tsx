import { useNavigation } from "@react-navigation/native";
import { Divider, Layout, TopNavigation, TopNavigationAction } from "@ui-kitten/components";
import { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MyIcon } from "../components/ui/MyIcon";

interface Props extends PropsWithChildren {
  title: string;
  subtitle?: string;

  rightActionIcon?: string;
  rightAction?: () => void;
}

export const MainLayout = ({
  title,
  subtitle,
  rightAction,
  rightActionIcon,
  children = null
}: Props) => {
  const { top } = useSafeAreaInsets()
  const { canGoBack, goBack } = useNavigation()

  const renderBackAction = () => (
    <TopNavigationAction
      icon={<MyIcon name="arrow-back-outline" />}
      onPress={ goBack }
    />
  )

  const RenderRightAction = () => {
    if (!rightActionIcon) return null

    return (
      <TopNavigationAction
        onPress={ rightAction }
        icon={ <MyIcon name={ rightActionIcon } /> }
      />
    )
  }

  return (
    <Layout style={{ paddingTop: top }}>
      <TopNavigation
        title={ title }
        subtitle={ subtitle }
        alignment="center"
        accessoryLeft={ canGoBack() ? renderBackAction : undefined }
        accessoryRight={ () => <RenderRightAction/> }
      />

      <Divider/>

      <Layout style={{ height: '100%' }}>
        { children }
      </Layout>
    </Layout>
  )
}
