import { useState } from 'react'
import { Alert, useWindowDimensions } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { RootStackParams } from '../../navigation/StackNavigator'
import { useAuthStore } from '../../store/auth/useAuthStore'

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}

export const LoginScreen = ({ navigation }: Props) => {
  const { login } = useAuthStore()

  const [form, setform] = useState({
    email: '',
    password: ''
  })
  const [isPosting, setIsPosting] = useState(false)
  const { height } = useWindowDimensions()

  const onLogin = async () => {
    if( form.email.length === 0 || form.password.length === 0 )
      return

    setIsPosting(true)
    const wasSuccessful = await login(form.email, form.password)
    setIsPosting(false)

    if (wasSuccessful) return;

    Alert.alert('Error', 'Usuario o contraseña incorrectos')
  }

  return (
    <Layout style={{ flex: 1 }}>
      <ScrollView
        style={{ marginHorizontal: 40 }}
        showsVerticalScrollIndicator={ false }
      >
        <Layout style={{ paddingTop: height * 0.35 }}>
          <Text category='h1'>Ingresar</Text>
          <Text category='p2'>Por favor ingrese para continuar</Text>
        </Layout>

        {/* Inputs */}
        <Layout style={{ marginTop: 20 }}>
          <Input
            placeholder='Correo electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            value={ form.email }
            onChangeText={ email => setform({ ...form, email })}
            accessoryLeft={ <MyIcon name='email-outline' /> }
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Contraseña'
            autoCapitalize='none'
            secureTextEntry
            value={ form.password }
            onChangeText={ password => setform({ ...form, password })}
            accessoryLeft={ <MyIcon name='lock-outline' /> }
            style={{ marginBottom: 10 }}
          />

          {/* Space */}
          <Layout style={{ height: 20 }} />

          {/* Button */}
          <Layout>
            <Button
              disabled={ isPosting }
              onPress={ onLogin }
              accessoryRight={ <MyIcon name='arrow-forward-outline' white /> }
            >
              Ingresar
            </Button>
          </Layout>

          {/* Información para crear cuenta */}
          <Layout style={{ height: 50 }} />

          <Layout
            style={{
              alignItems: 'flex-end',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Text>¿No tienes cuenta?</Text>
            <Text
              status='primary'
              category='s1'
              onPress={() => navigation.navigate('RegisterScreen')}
            >
              {' '}
              Crea una {' '}
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  )
}
