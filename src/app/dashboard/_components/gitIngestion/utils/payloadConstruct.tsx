export const constructPayload = (selectedOption: string, formData: Record<string, string>) => {
    const commonFields = {
      createdBy: "nirai",
      createdOn: new Date().toISOString(), 
    };
  
    switch (selectedOption) {
      case "git_https":
        return {
          url: formData["Git URL"],
          branch: formData["Branch"],
          ...commonFields,
        };
  
      case "git_https_pat":
        return {
          url: formData["Git URL"],
          personalAccessToken: formData["PAT"],
          branch: formData["Branch"],
          userName: "nirai"
        };
  
      case "git_ssh_pat":
        return {
        //   ...commonFields,
          url: formData["SSH URL"],
          personalAccessToken: formData["PAT"],
          userName: "nirai",
        };
  
      case "git_ssh_key":
        return {
        //   ...commonFields,
          url: formData["SSH URL"],
          userName: "nirai",
          publicKey: formData["Public Key"],
        };
  
      case "git_zip":
        return {
          zip: formData["Upload Zip"],
          ...commonFields,
        };
  
      default:
        throw new Error("Unsupported option");
    }
  };