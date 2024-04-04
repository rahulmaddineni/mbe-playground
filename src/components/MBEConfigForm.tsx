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
import { buildUrl } from "../helpers/mbe_url_builder.ts";
import "../styles/configstyles.css";

type Props = {};

type FormConfigProps = {
  randomExtBizID: boolean;
};
type FormProps = MBEConfig & { formConfig: FormConfigProps };

const MBEConfigForm: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    // formState: { errors },
  } = useForm<FormProps>({
    defaultValues: {
      formConfig: {
        randomExtBizID: true,
      },
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
        repeat: false,
      },
    },
  });

  const [formData, setFormData] = useState<FormProps>();
  const [loginUrl, setLoginUrl] = useState<string>();

  const generateRandomId = () => Math.random().toString(36).substring(2, 12);
  const isRandomExtBizIDChecked = watch("formConfig.randomExtBizID");

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

  const onHandleSubmit = (formData: FormProps) => {
    const { extras } = formData;
    // Set example business name if input is empty
    if (!extras.business_config.business.name) {
      formData.extras.business_config.business.name = "MBE Test Business";
    }
    setFormData(formData);

    // Set MBE Login URL
    const url = buildUrl(extras);
    setLoginUrl(url);
  };

  const onHandleLogin = () => {
    if (loginUrl) {
      window.open(loginUrl, "_blank");
    }
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      width: "250px",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "12px",
    }),
    option: (base) => ({
      ...base,
      fontSize: "12px",
    }),
  };

  return (
    <>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <div className="form-row">
          <div>
            <label htmlFor="externalBusinessId">External Business ID</label>
            <input
              type="text"
              id="externalBusinessId"
              disabled={isRandomExtBizIDChecked}
              className="form-input"
              {...register("extras.setup.external_business_id")}
            />
            <div className="random-external-id">
              <span className="random-external-id-input">Use Random ID</span>
              <input
                id="randomExtBizID"
                type="checkbox"
                {...register("formConfig.randomExtBizID")}
              />
            </div>
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
              styles={selectStyles}
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
              styles={selectStyles}
            />
          </div>
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="vertical">Vertical</label>
            <Select
              id="vertical"
              options={verticalOptions}
              defaultValue={verticalOptions.find(
                (option) => option.value === BusinessVertical.ECOMMERCE
              )}
              onChange={handleVerticalChange}
              styles={selectStyles}
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
              styles={selectStyles}
            />
          </div>
          <div>
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              placeholder="Example Business"
              className="form-input"
              {...register("extras.business_config.business.name")}
            />
          </div>
        </div>
        <div className="submit-row">
          <button type="submit" className="submit-button">
            Configure MBE
          </button>
        </div>
      </form>
      {formData && <JsonView data={formData.extras} heading="MBE Extras" />}
      {loginUrl && (
        <button className="submit-button" onClick={onHandleLogin}>
          Login
        </button>
      )}
    </>
  );
};

export default MBEConfigForm;
