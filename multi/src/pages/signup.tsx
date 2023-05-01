import { useAuth } from "@/contexts/AuthContext";
import router from "next/router";
import { FormProvider, useForm } from "react-hook-form";

interface SignupType {
    email: string;
    password: string;
}

export default function SignUp() {
    const methods = useForm<SignupType>({ mode: "onBlur" });

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = methods;

  const { user, signUp, logIn, logOut, signInWithGoogle } = useAuth();

  const onSubmit = async (data: SignupType) => {
   try {const res = await signUp(data.email, data.password);
    console.log(res);
    router.push("/dashboard");
   } catch (error) {
         console.log(error);
    }
  };

  const loginWithGoogle = async () => {
    try {
        const res = await signInWithGoogle();
        console.log(res);
        router.push("/dashboard");
    } catch (error) {
        console.log(error);
    }
    };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
            Flowbite    
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign up to your account
                </h1>

                <FormProvider {...methods}>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input  {...register("email", { required: "Email is required" })} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input  {...register("password", { required: "Password is required" })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                        {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
                </form>
                </FormProvider>

                <button type="button" onClick={loginWithGoogle} className="flex items-center justify-center w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    Sign up with Google
                </button>
            </div>
        </div>
    </div>
    </section>
  )
}
