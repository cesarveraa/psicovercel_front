import { useMutation } from "./@tanstack/react-query";
import React, { useEffect, useState } from "./react";
import { useForm } from "./react-hook-form";
import toast from "./react-hot-toast";
import { useDispatch, useSelector } from "./react-redux";
import { Link, useNavigate } from "./react-router-dom";

import { differenceInDays } from "./date-fns";
import MainLayout from "./../../components/MainLayout";
import { signup } from "./../../services/index/users";
import { userActions } from "./../../store/reducers/userReducers";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  // Generamos dos números aleatorios para el captcha primitivo
  const [num1] = useState(() => Math.floor(Math.random() * 10) + 1);
  const [num2] = useState(() => Math.floor(Math.random() * 10) + 1);
  const captchaSum = num1 + num2;

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password, sexo, ci }) =>
      signup({ name, email, password, sexo, ci }),
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem("account", JSON.stringify(data));

      if (data.createdAt) {
        const daysSince = differenceInDays(new Date(), new Date(data.createdAt));
        if (daysSince >= 60) {
          toast(
            (t) => (
              <span>
                Tu contraseña tiene <b>{daysSince}</b> días sin cambiarse.
                <br />
                Te recomendamos actualizarla pronto.
              </span>
            ),
            { duration: 10000 }
          );
        }
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });

  useEffect(() => {
    if (userState.userInfo) {
      navigate("/");
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      sexo: "",
      ci: "",
      email: "",
      password: "",
      confirmPassword: "",
      captcha: "",
    },
    mode: "onChange",
  });

  const password = watch("password");

  const submitHandler = (data) => {
    // validación del captcha primitivo
    if (parseInt(data.captcha, 10) !== captchaSum) {
      toast.error("Respuesta de captcha incorrecta");
      return;
    }
    const { name, email, password, sexo, ci } = data;
    mutate({ name, email, password, sexo, ci });
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="w-full max-w-sm mx-auto">
          <h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
            Cree una cuenta
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            {/* Nombre */}
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="name" className="text-[#5a7184] font-semibold block">
                Nombre
              </label>
              <input
                type="text"
                id="name"
                {...register("name", {
                  minLength: { value: 1, message: "El nombre debe tener al menos 1 carácter" },
                  required: { value: true, message: "El nombre es requerido" },
                })}
                placeholder="Ingrese su nombre"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.name ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.name?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
              )}
            </div>

            {/* Sexo */}
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="sexo" className="text-[#5a7184] font-semibold block">
                Sexo
              </label>
              <select
                {...register("sexo", { required: "Seleccionar el sexo es obligatorio" })}
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.sexo ? "border-red-500" : "border-[#c3cad9]"
                }`}
              >
                <option value="">Seleccione...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Prefiero no decirlo">Prefiero no decirlo</option>
              </select>
              {errors.sexo?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.sexo.message}</p>
              )}
            </div>

            {/* CI */}
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="ci" className="text-[#5a7184] font-semibold block">
                Carnet de Identidad (CI)
              </label>
              <input
                type="text"
                id="ci"
                {...register("ci", {
                  required: {
                    value: true,
                    message: "El número de carnet (CI) es requerido",
                  },
                  minLength: {
                    value: 7,
                    message: "El número de carnet debe tener al menos 7 dígitos",
                  },
                  maxLength: {
                    value: 9,
                    message: "El número de carnet no puede exceder 9 dígitos",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "El CI debe ser numérico",
                  },
                })}
                placeholder="Ej: 10234567"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.ci ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.ci?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.ci.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="email" className="text-[#5a7184] font-semibold block">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: { value: true, message: "Email es requerido" },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Ingrese un email válido",
                  },
                })}
                placeholder="Ingrese su email"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.email ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.email?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
              )}
            </div>

            {/* Contraseña */}
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="password" className="text-[#5a7184] font-semibold block">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: { value: true, message: "La contraseña es requerida" },
                  validate: (value) => {
                    const errors = [];
                    if (value.length < 12) errors.push("al menos 12 caracteres");
                    if (!/[A-Z]/.test(value)) errors.push("una mayúscula");
                    if (!/[a-z]/.test(value)) errors.push("una minúscula");
                    if (!/[0-9]/.test(value)) errors.push("un dígito");
                    if (!/[!@#$%^&*(),.?\":{}|<>_\-+=]/.test(value)) errors.push("un símbolo");
                    return errors.length === 0 || `La contraseña debe contener: ${errors.join(", ")}`;
                  },
                })}
                placeholder="Ingrese la contraseña"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.password ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.password?.message && (
                <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
              )}

              {/* Requisitos en tiempo real */}
              {password && (
                <ul className="text-xs text-[#5a7184] mt-2 list-disc ml-5 space-y-1">
                  <li className={password.length >= 12 ? "text-green-600" : "text-red-500"}>
                    Mínimo 12 caracteres
                  </li>
                  <li className={/[A-Z]/.test(password) ? "text-green-600" : "text-red-500"}>
                    Al menos una mayúscula
                  </li>
                  <li className={/[a-z]/.test(password) ? "text-green-600" : "text-red-500"}>
                    Al menos una minúscula
                  </li>
                  <li className={/[0-9]/.test(password) ? "text-green-600" : "text-red-500"}>
                    Al menos un dígito
                  </li>
                  <li className={/[!@#$%^&*(),.?\":{}|<>_\-+=]/.test(password) ? "text-green-600" : "text-red-500"}>
                    Al menos un símbolo
                  </li>
                </ul>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div className="flex flex-col mb-6 w-full">
              <label htmlFor="confirmPassword" className="text-[#5a7184] font-semibold block">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: { value: true, message: "Confirmar la contraseña es requerido" },
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden",
                })}
                placeholder="Confirme su contraseña"
                className={`placeholder:text-[#959ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border ${
                  errors.confirmPassword ? "border-red-500" : "border-[#c3cad9]"
                }`}
              />
              {errors.confirmPassword?.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <div className="flex flex-col mb-6 w-full">
              <label className="font-semibold mb-2">
                ¿Cuánto es {num1} + {num2}?
              </label>
              <input
                type="text"
                {...register("captcha", {
                  required: "Debes responder el captcha",
                  validate: (val) =>
                    parseInt(val, 10) === captchaSum || "Respuesta incorrecta",
                })}
                placeholder="Escribe el resultado"
                className={`mt-2 px-4 py-2 border rounded ${
                  errors.captcha ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.captcha && (
                <p className="text-red-500 text-xs mt-1">{errors.captcha.message}</p>
              )}
            </div>
            {/* Botón Registrar */}
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg mb-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Registrar
            </button>

            {/* Enlaces */}
            <p className="text-sm font-semibold text-[#5a7184] mb-4">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-primary">
                Inicia Sesión
              </Link>
            </p>
            <p className="text-sm font-semibold text-[#5a7184]">
              <Link to="/forgot-password" className="text-primary">
                ¿Olvidaste tu contraseña?
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default RegisterPage;
