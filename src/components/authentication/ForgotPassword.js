import React from 'react';
import {ForgotPassword as AForgotPassword} from 'aws-amplify-react-native';
import {
  Text,
  View,
  Header,
  Form,
  Item,
  Input,
  Button,
  Body,
  Container,
  Content,
} from 'native-base';
import {SafeAreaView, StyleSheet} from 'react-native';

//node_modules/aws-amplify-react-native/src/Auth/ForgotPassword.tsx:1
import I18n from '../../localisation/I18n';
import {TEST_IDS} from '../../constants/index';

export default class ForgotPassword extends AForgotPassword {
  showComponent(theme) {
    return (
      <SafeAreaView>
        <Header testID={TEST_IDS.AUTH.FORGOT_PASSWORD_TEXT}>
          <Body>
            <Text>{I18n.t('reset_password')}</Text>
          </Body>
        </Header>
        <Container style={styles.container}>
          {!this.state.delivery && this.forgotBody(theme)}
          {this.state.delivery && this.submitBody(theme)}
        </Container>
      </SafeAreaView>
    );
  }

  forgotBody(theme: AmplifyThemeType) {
    //We should check in "disabled" if the email is right formed since we are considering email instead of username
    return (
      <Content style={styles.content}>
        <Item rounded>{this.renderUsernameField(theme)}</Item>
        <View>
          <Text errorMessage>{this.state.error}</Text>
        </View>
        <View style={theme.sectionBody}>
          <Button
            small
            transparent
            style={styles.buttonForgotPassword}
            theme={theme}
            onPress={() => this.changeState('signIn')}
            testID={TEST_IDS.AUTH.BACK_TO_SIGN_IN_BUTTON}>
            <Text>{I18n.t('back_to_sign_in')}</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={this.send}
            disabled={!this.getUsernameFromInput()}
            testID={TEST_IDS.AUTH.SEND_BUTTON}>
            <Text>{I18n.t('send').toUpperCase()} </Text>
          </Button>
        </View>
      </Content>
    );
  }

  renderUsernameField(theme) {
    const value = this.getUsernameFromInput();
    //Here we trick the username as "Email"
    return (
      <Input
        onChangeText={(text) => this.setState({username: text})}
        label={I18n.t('email')}
        placeholder={I18n.t('enter_email')}
        testID={TEST_IDS.AUTH.EMAIL_INPUT}
      />
    );
  }

  submitBody(theme: AmplifyThemeType) {
    return (
      <Content style={styles.content}>
        <Item rounded style={styles.input}>
          <Input
            rounded
            theme={theme}
            onChangeText={(text) => this.setState({code: text})}
            label={I18n.t('confirmation_code')}
            placeholder={I18n.t('enter_confirmation_code')}
            required={true}
            testID={TEST_IDS.AUTH.CONFIRMATION_CODE_INPUT}
          />
        </Item>
        <Item rounded style={styles.input}>
          <Input
            theme={theme}
            onChangeText={(text) => this.setState({password: text})}
            label={I18n.t('password')}
            placeholder={I18n.t('enter_password')}
            secureTextEntry={true}
            required={true}
            testID={TEST_IDS.AUTH.PASSWORD_INPUT}
          />
        </Item>
        <View>
          <Text errorMessage>{this.state.error}</Text>
        </View>
        <Button
          style={styles.button}
          theme={theme}
          onPress={this.submit}
          disabled={!(this.state.code && this.state.password)}
          testID={TEST_IDS.AUTH.SUBMIT_BUTTON}>
          <Text>{I18n.t('submit')}</Text>
        </Button>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    display: 'flex',
    maxWidth: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    flex: 1,
    paddingTop: 46,
    padding: 10,
    minWidth: 410,
  },
  input: {
    marginBottom: 28,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
  },
  buttonForgotPassword: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    alignSelf: 'center',
    marginBottom: 14,
    marginTop: 10,
    marginRight: -30,
  },
  errorMessage: {
    paddingTop: 5,
  },
});
