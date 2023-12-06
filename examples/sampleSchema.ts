const FormSchema = {
  type: "object",
  properties: {
    // demographics
    demographics: {
      type: "object",
      properties: {
        lastName: {
          type: ["null", "string"],
          description: "The last name of the patient.",
        },
        firstName: {
          type: ["null", "string"],
          description: "The first name of the patient.",
        },
        age: {
          type: ["null", "string"],
          description: "The age of the patient.",
        },
        sex: {
          type: ["null", "string"],
          description:
            "The gender of the patient. Infer this from any pronouns used in the prompt. Example: if the patient is referred to using he or his put male for sex.",
        },
        weight: {
          type: ["null", "string"],
          description:
            "The weight of the patient in kilograms. Convert provided weight to kilograms.",
        },
        dob: {
          type: ["null", "string"],
          description:
            "The date of birth of the patient. Format it as a string in the format YYYY-MM-DD.",
        },
        hcn: {
          type: ["null", "string"],
          description:
            "The health card number of the patient. Usually an OHIP number.",
        },
        hcnVersion: {
          type: ["null", "string"],
          description:
            "The version of the health card number. Usually a 2 digit number.",
        },
        mailingAddressStreetNo: {
          type: ["null", "string"],
          description:
            "The street number of the patient's mailing address. Unless otherwise state, assume this is the same as the address of the incident.",
        },
        mailingAddressStreetName: {
          type: ["null", "string"],
          description:
            "The street name of the patient's mailing address. Unless otherwise state, assume this is the same as the address of the incident.",
        },
        mailingAddressCity: {
          type: ["null", "string"],
          description:
            "The city of the patient's mailing address. Unless otherwise state, assume this is the same as the address of the incident.",
        },
        province: {
          type: ["null", "string"],
          description:
            "The province of the patient's mailing address. Unless otherwise state, assume this is the same as the address of the incident.",
        },
        postalCode: {
          type: ["null", "string"],
          description: "The postal code of the patient's mailing address.",
        },
        country: {
          type: ["null", "string"],
          description:
            "The country of the patient's mailing address. Infer this from the province. For example, the province Ontario means the country is Canada.",
        },
        pickupLocation: {
          type: ["null", "string"],
          description:
            "The pickup location of the patient. This is the location where the paramedics picked up the patient. It is usually the same as the incident location but you need to infer whether or not the pickup and mailing addresses are the same from the prompt.",
        },
        pickupCode: {
          type: ["null", "string"],
          description:
            "The pickup code of the patient. This is the code that the paramedics use to identify the pickup location.",
        },
      },
      required: [
        "lastName",
        "firstName",
        "age",
        "sex",
        "weight",
        "dob",
        "hcn",
        "hcnVersion",
        "mailingAddressStreetNo",
        "mailingAddressStreetName",
        "mailingAddressCity",
        "province",
        "postalCode",
        "country",
        "pickupLocation",
        "pickupCode",
      ],
    },
    // clinical information
    clinicalInfo: {
      type: "object",
      properties: {
        dateOfOccurrence: {
          type: ["null", "string"],
          description:
            "The date of the incident. Format it as a string in the format YYYY-MM-DD.",
        },
        timeOfOccurrence: {
          type: ["null", "string"],
          description:
            "The time of the incident. Format it as a string in the format HH:MM.",
        },
        chiefComplaint: {
          type: ["null", "string"],
          description:
            "The chief complaint of the patient. This is the reason why the paramedics were called. This can be inferred from the prompt.",
        },
        positiveForFREI: {
          type: ["null", "boolean"],
          description:
            "Whether or not the patient is positive for FREI. FREI stands for fever, respiratory symptoms, exposure, and international travel. If the patient is positive for FREI, put true. Otherwise put false.",
        },
        incidentHistory: {
          type: ["null", "string"],
          description:
            "The incident history of the patient. This is the story of what happened to the patient leading up to the paramedics being called.",
        },
        pastMedicalHistory: {
          type: ["null", "object"],
          description:
            "An object that contains all the details about the the patient's past medical history. If the prompt doesn't contain any information about past medical history then supply null.",
          properties: {
            providedByPatient: {
              type: "boolean",
              description:
                "Whether or not the patient provided the past medical history. This should be inferred if it is not explicitly stated in the prompt.",
            },
            otherProvider: {
              type: ["null", "string"],
              description:
                "The name of the provider of the past medical history if the patient did not provide it. This property is only filled if providedByPatient is false.",
            },
          },
          required: ["providedByPatient", "otherProvider"],
        },
      },
      required: [
        "dateOfOccurrence",
        "timeOfOccurrence",
        "chiefComplaint",
        "positiveForFREI",
        "incidentHistory",
        "pastMedicalHistory",
      ],
    },
  },
  required: ["demographics", "clinicalInfo"],
};
