/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Button from "../Button";
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";
// TODO: Add more social login options

const RegisterModal = () => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm<FieldValues>({
        defaultValues: {
            name: " ",
            email: " ",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post("/api/register", data).then(() => {
            toast.success("Account created successfully");
            registerModal.onClose();
            loginModal.onOpen();
        }).catch((error) => {
            toast.error("Something went wrong");

        }).finally(() => {
            setIsLoading(false);
        });
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen();
    }, [registerModal, loginModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
           <Heading title="Welcome to EVENTOS" subtitle="Create an account!" /> 
           {/* TODO: Change to the actual name of the app */}
           <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
           <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
           <Input 
             id="password" 
             label="Password" 
             type="password"  // Add this line
             disabled={isLoading} 
             register={register} 
             errors={errors} 
             required 
           />
           
        </div>
    );  // Added closing parenthesis and semicolon her e

    const footerContent = (
      <>
        <div className="flex flex-col gap-4 mt-3">
          <hr />
          <Button outline label="Continue with Google" icon={FcGoogle} onClick={() => signIn('google')} />
          {/* TODO: Add more social login options */}
        </div>

        <div className="text-neutral-500 text-center mt-4 font-light">
          <div className="justify-center flex flex-row items-center gap-2">
            <div>Already have an account?</div>
            <div 
              onClick={toggle} 
              className="text-neutral-800 cursor-pointer hover:underline"
            >
              Log in
            </div>
          </div>
        </div>
      </>
    );

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            title="Register"
            actionLabel="Continue"
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;
