import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth, useAlert } from '@/template';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const { sendOTP, verifyOTPAndLogin, signUpWithPassword, signInWithPassword, operationLoading } = useAuth();
  const { showAlert } = useAlert();
  const insets = useSafeAreaInsets();

  const [isRegister, setIsRegister] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [email, setEmail] = useState('gabrielbragaexe@gmail.com');
  const [password, setPassword] = useState('Gab@1007');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert('Erro', 'Preencha email e senha');
      return;
    }

    const { error } = await signInWithPassword(email, password);
    if (error) {
      showAlert('Erro', error);
    }
  };

  const handleRegisterStart = async () => {
    if (!email || !password || !confirmPassword) {
      showAlert('Erro', 'Preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Erro', 'As senhas não coincidem');
      return;
    }

    const { error } = await sendOTP(email);
    if (error) {
      showAlert('Erro', error);
    } else {
      setShowOTP(true);
      showAlert('Sucesso', 'Código enviado para seu email');
    }
  };

  const handleRegisterComplete = async () => {
    if (!otp) {
      showAlert('Erro', 'Digite o código OTP');
      return;
    }

    const { error } = await verifyOTPAndLogin(email, otp, { password });
    if (error) {
      showAlert('Erro', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { paddingTop: Math.max(insets.top, 20) }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.logoContainer}>
          <Logo size={180} />
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subtitle}>Entre para continuar</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL</Text>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="__________________"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!showOTP}
            />
          </View>

          {showOTP ? (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>TOKEN</Text>
              <Input
                value={otp}
                onChangeText={setOtp}
                placeholder="______"
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>
          ) : (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>SENHA</Text>
                <Input
                  value={password}
                  onChangeText={setPassword}
                  placeholder="______"
                  secureTextEntry
                />
              </View>

              {isRegister && (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>CONFIRMAR SENHA</Text>
                  <Input
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="______"
                    secureTextEntry
                  />
                </View>
              )}
            </>
          )}

          <View style={styles.buttonContainer}>
            {showOTP ? (
              <Button
                title="Confirmar OTP"
                onPress={handleRegisterComplete}
                loading={operationLoading}
              />
            ) : isRegister ? (
              <Button
                title="Cadastrar"
                onPress={handleRegisterStart}
                loading={operationLoading}
              />
            ) : (
              <Button
                title="Sign Up"
                onPress={handleLogin}
                loading={operationLoading}
              />
            )}
          </View>

          {!showOTP && (
            <Text style={styles.switchText}>
              {isRegister ? 'Já tem conta? ' : 'Não tem conta? '}
              <Text
                style={styles.switchLink}
                onPress={() => setIsRegister(!isRegister)}
              >
                {isRegister ? 'Entrar' : 'Cadastre-se'}
              </Text>
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xxl,
    marginBottom: theme.spacing.xl,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.inverse,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.inverse,
    marginBottom: theme.spacing.sm,
    fontWeight: theme.fontWeight.semibold,
  },
  buttonContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  switchText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.inverse,
    textAlign: 'center',
  },
  switchLink: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold,
  },
});
