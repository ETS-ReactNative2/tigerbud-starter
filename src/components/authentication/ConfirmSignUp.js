import React from 'react';
import {ConfirmSignUp as AConfirmSignUp} from 'aws-amplify-react-native';
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

//node_modules/aws-amplify-react-native/src/Auth/ConfirmSignUp.tsx:1
import I18n from '../../localisation/I18n';
import {TEST_IDS} from '../../constants/index';

export default class ConfirmSignUp extends AConfirmSignUp {
  showComponent(theme) {
    const username = this.getUsernameFromInput();
    return (
      <SafeAreaView>
        <Header theme={theme} testID={TEST_IDS.AUTH.CONFIRM_SIGN_UP_TEXT}>
          <Body>
            <Text>{I18n.t('confirm_sign_up')}</Text>
          </Body>
        </Header>
        {/*Adding a fast inline css just to "see a basic layout, this will be removed" */}
        <Container style={styles.container}>
          <Content style={styles.content}>
            <Item rounded style={styles.input}>
              {this.renderUsernameField(theme)}
            </Item>
            <Item rounded>
              <Input
                theme={theme}
                onChangeText={(text) => this.setState({code: text})}
                label={I18n.t('confirmation_code')}
                placeholder={I18n.t('enter_confirmation_code')}
                required={true}
                testID={TEST_IDS.AUTH.CONFIRMATION_CODE_INPUT}
              />
            </Item>
            <View>
              <Text errorMessage style={styles.errorMessage}>
                {this.state.error}
              </Text>
            </View>

            <View style={theme.sectionBody}>
              <Button
                small
                style={styles.buttonForgotPassword}
                transparent
                theme={theme}
                onPress={() => this.changeState('signIn')}
                testID={TEST_IDS.AUTH.BACK_TO_SIGN_IN_BUTTON}>
                <Text>{I18n.t('back_to_sign_in')}</Text>
              </Button>

              <Button
                onPress={this.confirm}
                style={styles.button}
                disabled={!username || !this.state.code}
                testID={TEST_IDS.AUTH.CONFIRM_BUTTON}>
                <Text> {I18n.t('confirm')}</Text>
              </Button>

              <View style={styles.sectionFooter}>
                <Button
                  bordered
                  style={styles.button}
                  theme={theme}
                  onPress={this.resend}
                  disabled={!this.state.username}
                  testID={TEST_IDS.AUTH.RESEND_CODE_BUTTON}>
                  <Text>{I18n.t('resend_code')}</Text>
                </Button>
              </View>
            </View>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
  //TODO: Consider refactor this, but we should pass props and then some functions to set the state with callback

  renderUsernameField(theme) {
    const value = this.getUsernameFromInput();
    const {usernameAttributes = []} = this.props;
    if (usernameAttributes === 'email') {
      return (
        <Input
          onChangeText={(text) => this.setState({email: text})}
          label={I18n.t('email')}
          placeholder={I18n.t('enter_email')}
          testID={TEST_IDS.AUTH.EMAIL_INPUT}
          value={value}
        />
      );
    } else if (usernameAttributes === 'phone_number') {
      return (
        <Input
          key={'phone_number'}
          onChangeText={(text) => this.setState({phone_number: text})}
          label={I18n.t('phone_number')}
          placeholder={I18n.t('enter_phone_number')}
          keyboardType="phone-pad"
          testID={TEST_IDS.AUTH.PHONE_INPUT}
          value={value}
        />
      );
    } else {
      return (
        <Input
          onChangeText={(text) => this.setState({username: text})}
          label={I18n.t(this.getUsernameLabel())}
          placeholder={I18n.t('enter_username')}
          testID={TEST_IDS.AUTH.USERNAME_INPUT}
          value={value}
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    display: 'flex',
    minWidth: 410,
    maxWidth: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    flex: 1,
    paddingTop: 46,
  },
  input: {
    marginBottom: 38,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  buttonForgotPassword: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    alignSelf: 'center',
    paddingTop: 0,
    marginRight: -30,
  },
  errorMessage: {
    paddingTop: 5,
  },
  sectionFooter: {
    height: 370,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
