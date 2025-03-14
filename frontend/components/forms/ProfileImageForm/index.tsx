"use client";
import React from "react";
import { useActionState } from "react";

import { cn } from "@/lib/utils";

import { uploadProfileImageAction } from "@/data/actions/profileAction";

import { SubmitButton } from "@/components/Button/SubmitButton";
import ImagePicker from "@/components/global/imagePicker";
import { ZodErrors } from "@/components/global/zodError";
import { StrapiErrors } from "@/components/global/StrapiError";

interface ProfileImageFormProps {
  id: string;
  url: string;
  alternativeText: string;
}

const initialState = {
  message: null,
  data: null,
  strapiErrors: null,
  zodErrors: null,
};

export function ProfileImageForm({
  data,
  className,
}: {
  data: Readonly<ProfileImageFormProps>;
  className?: string;
}) {
  const uploadProfileImageWithIdAction = uploadProfileImageAction.bind(
    null,
    data?.id
  );

  const [formState, formAction] = useActionState(
    uploadProfileImageWithIdAction,
    initialState
  );

  return (
    <form className={cn("space-y-4", className)} action={formAction}>
      <div className="">
        <ImagePicker
          id="image"
          name="image"
          label="Profile Image"
          defaultValue={data?.url || ""}
        />
        <ZodErrors error={formState?.zodErrors?.image} />
        <StrapiErrors error={formState?.strapiErrors} />
      </div>
      <div className="flex justify-end">
        <SubmitButton text="Update Image" loadingText="Saving Image" />
      </div>
    </form>
  );
}
