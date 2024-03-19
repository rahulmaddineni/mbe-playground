import React, { useState } from "react";
import { useForm } from "react-hook-form";

type ConfigFormProps = {};

const MBEConfigForm: React.FC<ConfigFormProps> = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <form onSubmit={handleSubmit(() => {})}>
      <label htmlFor="externalBusinessId">External Business ID:</label>
      <input
        type="text"
        id="externalBusinessId"
        {...register("extras.setup.external_business_id")}
      />
      <button type="submit">Generate MBE URL</button>
    </form>
  );
};

export default MBEConfigForm;
