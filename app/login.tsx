import { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth, useAlert } from '@/template';
import { Logo } from '@/components/ui/Logo';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { theme } from '@/constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

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
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.background.primary, theme.colors.background.secondary]}
        style={StyleSheet.absoluteFill}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.keyboardView, { paddingTop: Math.max(insets.top, 20) }]}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.logoContainer}>
            <Logo size={180} />
          </View>

          <View style={styles.formCard}>
            <Text style={styles.title}>{isRegister ? 'Criar Conta' : 'Bem-vindo'}</Text>
            <Text style={styles.subtitle}>
              {isRegister ? 'Preencha os dados para começar' : 'Entre para acessar seu diário de pesca'}
            </Text>

            <View style={styles.formContent}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>EMAIL</Text>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="seu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!showOTP}
                  style={styles.input}
                />
              </View>

              {showOTP ? (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>CÓDIGO DE VERIFICAÇÃO</Text>
                  <Input
                    value={otp}
                    onChangeText={setOtp}
                    placeholder="123456"
                    keyboardType="number-pad"
                    maxLength={6}
                    style={styles.input}
                  />
                </View>
              ) : (
                <>
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>SENHA</Text>
                    <Input
                      value={password}
                      onChangeText={setPassword}
                      placeholder="••••••••"
                      secureTextEntry
                      style={styles.input}
                    />
                  </View>

                  {isRegister && (
                    <View style={styles.inputGroup}>
                      <Text style={styles.label}>CONFIRMAR SENHA</Text>
                      <Input
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="••••••••"
                        secureTextEntry
                        style={styles.input}
                      />
                    </View>
                  )}
                </>
              )}

              <View style={styles.buttonContainer}>
                {showOTP ? (
                  <Button
                    title="Confirmar Código"
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
                    title="Entrar"
                    onPress={handleLogin}
                    loading={operationLoading}
                  />
                )}
              </View>

              {!showOTP && (
                <View style={styles.footer}>
                  <Text style={styles.switchText}>
                    {isRegister ? 'Já tem uma conta? ' : 'Ainda não tem conta? '}
                  </Text>
                  <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
                    <Text style={styles.switchLink}>
                      {isRegister ? 'Entrar' : 'Cadastre-se'}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: theme.fontSize.xxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text.inverse,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text.placeholder,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  formContent: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.text.placeholder,
    marginBottom: theme.spacing.xs,
    fontWeight: theme.fontWeight.semibold,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: theme.colors.text.inverse,
  },
  buttonContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchText: {
    fontSize: theme.fontSize.md,
    color: theme.colors.text.placeholder,
  },
  switchLink: {
    fontSize: theme.fontSize.md,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.bold,
  },
});
