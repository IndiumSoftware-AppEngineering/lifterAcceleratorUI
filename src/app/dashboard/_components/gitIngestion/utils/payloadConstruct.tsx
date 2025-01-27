export const constructPayload = (selectedOption: string, formData: Record<string, string>) => {
    const commonFields = {
      createdBy: process.env.DB_CREATEDBY as string,
      createdOn: new Date().toISOString(), 
    };
  
    switch (selectedOption) {
      case "git_https":
        return {
          url: formData["Git URL"],
          branch: formData["Branch"],
          ingestionMode: "PUBLIC_HTTPS"
        };
  
      case "git_https_pat":
        return {
          url: formData["Git URL"],
          personalAccessToken: formData["PAT"],
          branch: formData["Branch"],
          userName: process.env.DB_CREATEDBY as string,
          ingestionMode: "PRIVATE_HTTPS",
          ...commonFields,
        };
  
      case "git_ssh_pat":
        return {
        //   ...commonFields,
          url: formData["SSH URL"],
          personalAccessToken: formData["PAT"],
          userName: process.env.DB_CREATEDBY as string,
          ingestionMode: "PRIVATE_SSH_PW",
        };
  
      case "git_ssh_key":
        return {
        //   ...commonFields,
          url: formData["SSH URL"],
          userName: process.env.DB_CREATEDBY as string,
          publicKey: formData["Public Key"],
          ingestion_mode: "PRIVATE_SSH"
        };
  
      case "git_zip":
        return {
          zip: formData["Upload Zip"],
          ingestionMode:"ZIP",
          ...commonFields,
        };
  
      default:
        throw new Error("Unsupported option");
    }
  };