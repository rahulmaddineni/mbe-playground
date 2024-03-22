import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  BusinessVertical,
  MBEConfig,
  MBEFlow,
  Timezones,
  currencyCodeOptions,
} from "../types/MBEConfig.ts";
import Select from "react-select";
import JsonView from "./JSONView.tsx";

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
          currency: "USD",
          business_vertical: BusinessVertical.ECOMMERCE,
          channel: MBEFlow.DEFAULT,
        },
        business_config: {
          business: {
            name: "",
          },
        },
      },
    },
  });

  const [formData, setFormData] = useState<FormProps>();

  const generateRandomId = () => Math.random().toString(36).substring(2, 12);
  const isRandomExtBizIDChecked = watch("randomExtBizID");

  const timezoneOptions = Timezones.map((timezone) => ({
    value: timezone,
    label: timezone,
  }));
  const handleTimezoneChange = (selectedOption) => {
    setValue("extras.setup.timezone", selectedOption.value);
  };

  const handleCurrencyChange = (selectedOption) => {
    setValue("extras.setup.currency", selectedOption.value);
  };

  const verticalOptions = Object.values(BusinessVertical).map((vertical) => ({
    value: vertical,
    label: vertical,
  }));
  const handleVerticalChange = (selectedOption) => {
    setValue("extras.setup.business_vertical", selectedOption.value);
  };

  const channelOptions = Object.values(MBEFlow).map((flow) => ({
    value: flow,
    label: flow,
  }));
  const handleChannelChange = (selectedOption) => {
    setValue("extras.setup.channel", selectedOption.value);
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
    <>
      <form
        onSubmit={handleSubmit((formData) => {
          // Set example business name if input is empty
          if (!formData.extras.business_config.business.name) {
            formData.extras.business_config.business.name = "MBE Test Business";
          }
          setFormData(formData);
        })}
      >
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
        <div>
          <label htmlFor="currency">Currency</label>
          <Select
            id="currency"
            options={currencyCodeOptions}
            defaultValue={currencyCodeOptions.find(
              (option) => option.value === "USD"
            )}
            onChange={handleCurrencyChange}
          />
        </div>
        <div>
          <label htmlFor="vertical">Vertical</label>
          <Select
            id="vertical"
            options={verticalOptions}
            defaultValue={verticalOptions.find(
              (option) => option.value === BusinessVertical.ECOMMERCE
            )}
            onChange={handleVerticalChange}
          />
        </div>
        <div>
          <label htmlFor="channel">Channel</label>
          <Select
            id="channel"
            options={channelOptions}
            defaultValue={channelOptions.find(
              (option) => option.value === MBEFlow.DEFAULT
            )}
            onChange={handleChannelChange}
          />
        </div>
        <div>
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            placeholder="Example Business"
            {...register("extras.business_config.business.name")}
          />
        </div>
        <button type="submit">Configure MBE</button>
      </form>
      {formData && <JsonView data={formData} />}
    </>
  );
};

export default MBEConfigForm;
