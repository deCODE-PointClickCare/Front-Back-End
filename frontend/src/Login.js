import { useState } from "react";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ButtonPrimary } from "./components/Button";
import { Card, Container } from "./components/Layout";
import { Body2, Headline4, HeadlineVarient, Link } from "./components/Text";
import theme from "./Theme";
import { Formik, Form, Field } from "formik";
import history from "./history";

const emailRegex = new RegExp(
  "^[\\w.\\-]{1,100}@[\\w.\\-]{1,100}\\.[A-Za-z]{2,4}$"
);

const LoginPage = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    let error;

    if (!email) {
      error = "Please enter an email";
    } else if (!emailRegex.test(email)) {
      error = "Email has invalid format";
    }

    return error;
  };

  const validatePassword = (password) => {
    let error;

    if (!password) {
      error = "Please enter a password";
    }

    return error;
  };

  return (
    <>
      <Box
        height="100vh"
        background="#F3FCFF"
        backgroundSize="auto 100%"
        minHeight={[700, 640].map((height) => `${height}px`)}
      >
        <Container height="100%">
          <Flex height="100%" direction="column" justify="center">
            <Flex justify={["center", "center", "center", "center"]}>
              <Card
                width="100%"
                minWidth="256px"
                maxWidth={["100%", "4.5in", "5in", "5in", "5.5in"]}
                paddingX={["2.5rem", "3.5rem", "4rem"]}
                paddingTop={["5rem"]}
                paddingBottom={["6rem"]}
              >
                <Headline4 color={theme.colors.secondary} marginBottom="12px">
                  Decode Hackathon
                </Headline4>
                <HeadlineVarient fontSize="20px !important" marginBottom="2rem">
                  Log in
                </HeadlineVarient>
                <Formik
                  initialValues={{ email: "", password: "" }}
                  onSubmit={(values, actions) => {
                    const { email, password } = values;
                  }}
                >
                  {(props) => (
                    <Form>
                      <Stack spacing="16px">
                        <Field name="email" validate={validateEmail}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
                            >
                              <FormLabel htmlFor="email">
                                Email address
                              </FormLabel>
                              <Input
                                {...field}
                                id="email"
                                placeholder="you@company.com"
                                type="email"
                              />
                              <FormErrorMessage>
                                {form.errors.email}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                        <Field name="password" validate={validatePassword}>
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.password && form.touched.password
                              }
                            >
                              <FormLabel htmlFor="password">Password</FormLabel>
                              <InputGroup>
                                <Input
                                  {...field}
                                  id="password"
                                  placeholder="********"
                                  type={showPassword ? "text" : "password"}
                                />
                                <InputRightElement
                                  onClick={() => setShowPassword(!showPassword)}
                                  cursor="pointer"
                                  color={theme.colors.secondary_variant}
                                  transition="0.2s"
                                  _hover={{ color: theme.colors.secondary }}
                                >
                                  {showPassword ? (
                                    <ViewIcon />
                                  ) : (
                                    <ViewOffIcon />
                                  )}
                                </InputRightElement>
                              </InputGroup>
                              <FormErrorMessage>
                                {form.errors.password}
                              </FormErrorMessage>
                            </FormControl>
                          )}
                        </Field>
                      </Stack>
                      <ButtonPrimary
                        isFullWidth
                        marginTop="24px"
                        isLoading={props.isSubmitting}
                        type="submit"
                        onClick={() => history.push("/ReadmissionForm")}
                      >
                        Log in
                      </ButtonPrimary>
                    </Form>
                  )}
                </Formik>
                <Body2 marginTop="36px"></Body2>
              </Card>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  );
};

export default LoginPage;
