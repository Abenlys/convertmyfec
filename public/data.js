export const data = [
  {
    inf: "code journal de l'écriture comptable",
    fieldname: "JournalCode",
    typeof: "Alphanumeric",
  },
  {
    inf: "libellé journal de l'écriture comptable",
    fieldname: "JournalLib",
    typeof: "Alphanumeric",
  },
  {
    inf: "numéro sur une séquence continue de l'écriture comptable",
    fieldname: "EcritureNum",
    typeof: "Alphanumeric",
  },
  {
    inf: "date de comptabilisation de l'écriture comptable",
    fieldname: "EcritureDate",
    typeof: "Date",
  },
  {
    inf: "Le numéro de compte, dont les trois premiers caractères doivent correspondre à des chiffres respectant les normes du plan comptable français",
    fieldname: "CompteNum",
    typeof: "Alphanumeric",
  },
  {
    inf: "Le libellé de compte, conformément à la nomenclature du plan comptable français",
    fieldname: "CompteLib",
    typeof: "Alphanumeric",
  },
  {
    inf: "Le numéro de compte auxiliaire (à blanc si non utilisé)",
    fieldname: "CompAuxNum",
    typeof: "Alphanumeric",
  },
  {
    inf: "Le libellé de compte auxiliaire (à blanc si non utilisé)",
    fieldname: "CompAuxLib",
    typeof: "Alphanumeric",
  },
  {
    inf: "La référence de la pièce justificative",
    fieldname: "PieceRef",
    typeof: "Alphanumeric",
  },
  {
    inf: "La date de la pièce justificative",
    fieldname: "PieceDate",
    typeof: "Date",
  },
  {
    inf: "Le libellé de l'écriture comptable",
    fieldname: "EcritureLib",
    typeof: "Alphanumeric",
  },
  {
    inf: "Le montant au débit",
    fieldname: "Debit",
    typeof: "Numeric",
  },
  {
    inf: "Le montant au crédit",
    fieldname: "Credit",
    typeof: "Numeric",
  },
  {
    inf: "Le lettrage de l'écriture comptable (à blanc si non utilisé)",
    fieldname: "EcritureLet",
    typeof: "Alphanumeric",
  },
  {
    inf: "La date de lettrage (à blanc si non utilisé)",
    fieldname: "DateLet",
    typeof: "Date",
  },
  {
    inf: "La date de validation de l'écriture comptable",
    fieldname: "ValidDate",
    typeof: "Date",
  },
  {
    inf: "Le montant en devise (à blanc si non utilisé)",
    fieldname: "Montantdevise",
    typeof: "Numeric",
  },
  {
    inf: "L'identifiant de la devise (à blanc si non utilisé)",
    fieldname: "Idevise",
    typeof: "Alphanumeric",
  }
];


  // change for sure
  // const handleFileChange = async (event) => {
  //   const file = event.target.files[0];
  //   if (depositedFile.name !== file.name) {
  //     try {
  //       const content = await readFilesContent(file);
  //       const separator = detectSeparator(content);
  //       const lines = content.split("\n");
  //       // console.log(lines);

  //       setPreviewData(
  //         lines.map((line) => {
  //           return line.split(separator);
  //         })
  //       );
  //     } catch (error) {
  //       console.error("Erreur lors de la lecture du fichier : ", error);
  //     }
  //   } else {
  //     console.log("le meme fichier a été sélectionné.");
  //   }
  // };
  // no more usefull
  // const readFilesContent = (file) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       resolve(event.target.result);
  //     };
  //     reader.onerror = (error) => {
  //       reject(error);
  //     };
  //     reader.readAsText(file);
  //   });
  // };
  // no more usefull
  // const detectSeparator = (content) => {
  //   if (content.includes("\t")) {
  //     return "\t";
  //   } else if (content.includes(";")) {
  //     return ";";
  //   } else if (content.includes("|")) {
  //     return "|";
  //   } else if (content.includes(",")) {
  //     return ",";
  //   } else {
  //     return ";";
  //   }
  // };

  // no more usefull
  // const generateModifiedFileContent = () => {
  //   if (previewData) {
  //     const modifiedContent = previewData
  //       .map((row) => row.join("|"))
  //       .join("\n");
  //     return modifiedContent;
  //   }
  //   return "";
  // };
  // to modify
  // const dowloadModifiedFile = () => {
  //   const modifiedContent = generateModifiedFileContent();
  //   if (modifiedContent) {
  //     const blob = new Blob([modifiedContent], { type: "text/plain" });
  //     const link = document.createElement("a");
  //     link.href = URL.createObjectURL(blob);
  //     link.download =
  //       depositedFile.name.substring(0, depositedFile.name.indexOf(".")) +
  //       "(copie).txt";
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   }
  // };


  // const handleModify = () => {
  //   if (previewData !== null) {
  //     const sectionInputs = document.querySelectorAll(
  //       ".page_items__yzFf6 .page_input__lx_gt"
  //     );
  //     const modifiedData = previewData.map((element) => {
  //       if (element[4] && element[4].startsWith("401")) {
  //         const modifiedFrns =
  //           substitueSpace(inputData.newFrns, " ", "") +
  //           element[6].slice(substitueSpace(inputData.oldFrns, " ", "").length);
  //         return [...element.slice(0, 6), modifiedFrns, ...element.slice(7)];
  //       } else if (element[4] && element[4].startsWith("411")) {
  //         const modifiedClts =
  //           substitueSpace(inputData.newClts, " ", "") +
  //           element[6].slice(substitueSpace(inputData.oldClts, " ", "").length);
  //         return [...element.slice(0, 6), modifiedClts, ...element.slice(7)];
  //       }
  //       return element;
  //     });
  //     setPreviewData(modifiedData);
  //     sectionInputs.forEach((input) => {
  //       input.value = null;
  //     });
  //     setInputData({ oldFrns: "", oldClts: "", newFrns: "", newClts: "" });
  //   }
  // };