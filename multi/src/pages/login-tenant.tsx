import { useAuth } from "@/contexts/AuthContext";
import type { Tenant } from "firebase-admin/lib/auth/tenant";
import Link from "next/link";
import router from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, set, useForm } from "react-hook-form";

interface SignInType {
    email: string;
    password: string;
    tenant_id: string;
}

export default function SignIn() {
    const methods = useForm<SignInType>({ mode: "onBlur" });

    const {
        register,
        handleSubmit,
        formState: { errors  },
      } = methods;

  const { logIn, signInWithGoogle } = useAuth();

  const onSubmit = async (data: SignInType) => {
    try {
        await logIn(data.email, data.password, data.tenant_id);
        router.push("/dashboard");
      } catch (error: any) {
        console.log(error.message);
      }
  };

    const [ tenants, setTenants ] = useState<Tenant[]>([]);
    const [ selectedTenant, setSelectedTenant ] = useState<string | undefined>();


    const handleTenantChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTenant(event.target.value);

        console.log("handleTenantChange", event.target.value);
    };

    const loginWithGoogle = async () => {
        try {
            await signInWithGoogle(selectedTenant);
            router.push("/dashboard");
        } catch (error: any) {
            console.log(error.message);
        }
    };

    const getTenants = useCallback(async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tenants");
            const data = await response.json();
            setTenants(data.tenants as Tenant[]) 
        } catch (error) {
            console.log(error);
        }
    }, [setTenants]);


    useEffect(() => {
        getTenants();
    }, [getTenants]);


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
                    Sign in to your account
                </h1>
                <FormProvider {...methods}>
                <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                    <label htmlFor="tenant_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tenant</label>
                    <select  {...register("tenant_id", { required: "Tenant ID is required" })} onChange={handleTenantChange}  id="tenant_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                     {tenants.map((tenant) => (
                         <option key={tenant.tenantId} value={tenant.tenantId}>{tenant.displayName}</option>
                        ))}
                    </select>
                        
                    </div>
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
                              <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                            </div>
                            <div className="ml-3 text-sm">
                              <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet? <Link href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
                    </p>
                </form>
                </FormProvider>
                { <button type="button" onClick={loginWithGoogle} className="flex items-center justify-center w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    Sign in with Google
                </button> }
            </div>
        </div>
    </div>
    </section>
  )
}
