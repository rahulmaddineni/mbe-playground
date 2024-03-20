import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { MBEConfig, Timezones } from "./types/MBEConfig.ts";
import Select from "react-select";

type Props = {};

type FormConfigProps = {
  randomExtBizID: boolean;
};
type FormProps = MBEConfig & FormConfigProps;

const MBEConfigForm: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      randomExtBizID: true,
      extras: {
        setup: {
          external_business_id: "",
          timezone: "America/Los_Angeles",
        },
      },
    },
  });

  const generateRandomId = () => Math.random().toString(36).substring(2, 12);
  const isRandomExtBizIDChecked = watch("randomExtBizID");

  const timezoneOptions = Timezones.map((timezone) => ({
    value: timezone,
    label: timezone,
  }));
  const handleTimezoneChange = (selectedOption) => {
    setValue("extras.setup.timezone", selectedOption.value);
  };

  useEffect(() => {
    // Set Random External Business ID when toggled on
    if (isRandomExtBizIDChecked) {
      setValue(
        "extras.setup.external_business_id",
        `mbe-test-${generateRandomId()}`
      );
    }
  }, [isRandomExtBizIDChecked, setValue]);

  return (
    <form onSubmit={handleSubmit((formData) => {})}>
      <div>
        <label htmlFor="externalBusinessId">External Business ID</label>
        <input
          type="text"
          id="externalBusinessId"
          disabled={isRandomExtBizIDChecked}
          {...register("extras.setup.external_business_id")}
        />
        <label htmlFor="randomExtBizID">Use Random ID</label>
        <input
          id="randomExtBizID"
          type="checkbox"
          {...register("randomExtBizID")}
        />
      </div>
      <div>
        <label htmlFor="timezone">Timezone</label>
        <Select
          id="timezone"
          options={timezoneOptions}
          defaultValue={timezoneOptions.find(
            (option) => option.value === "America/Los_Angeles"
          )}
          onChange={handleTimezoneChange}
        />
      </div>
      <button type="submit">Configure MBE</button>
    </form>
  );
};

export default MBEConfigForm;
