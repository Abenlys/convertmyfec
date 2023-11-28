"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import { data } from "public/data.js";
import moneycash from "public/money-cash.svg";
import filefind from "public/file-find.svg";
import filetext from "public/file-text.svg";
import cross from "public/cross-mark.svg";
import Footer from "./components/Footer";

export default function Home() {
  const [previewData, setPreviewData] = useState(null);
  const [depositedFile, setDepositedFile] = useState({
    name: "",
    filed: false,
    size: "",
  });
  const [inputData, setInputData] = useState({
    oldFrns: "",
    oldClts: "",
    newFrns: "",
    newClts: "",
  });
  // console.log(data);
  // console.log(previewData);
  if (previewData !== null) {
    // console.log(previewData[0]);
    // console.log(previewData.slice(1));
    // console.log(previewData[0][4]);
  }

  const handleAuxChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  function substitueSpace(str, oldChar, newChar) {
    return str.replace(new RegExp(oldChar, "g"), newChar);
  }

  const handleResetFile = () => {
    if (depositedFile.filed) {
      const fileInputs = document.querySelectorAll(".page_input__lx_gt");
      fileInputs.forEach((input) => {
        input.value = null;
      });
      setDepositedFile({ name: "", filed: false, size: "" });
      setPreviewData(null);
    }
  };

  const handleModify = () => {
    if (previewData !== null) {
      const modifiedData = previewData.map((element) => {
        if (element[4] && element[4].startsWith("401")) {
          const modifiedFrns =
            substitueSpace(inputData.newFrns, " ", "") +
            element[6].slice(substitueSpace(inputData.oldFrns, " ", "").length);
          return [...element.slice(0, 6), modifiedFrns, ...element.slice(7)];
        } else if (element[4] && element[4].startsWith("411")) {
          const modifiedClts =
            substitueSpace(inputData.newClts, " ", "") +
            element[6].slice(substitueSpace(inputData.oldClts, " ", "").length);
          return [...element.slice(0, 6), modifiedClts, ...element.slice(7)];
        }
        return element;
      });
      setPreviewData(modifiedData);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (depositedFile.name !== file.name) {
      try {
        const content = await readFilesContent(file);
        const separator = detectSeparator(content);
        const lines = content.split("\n");
        // console.log(lines);
        setDepositedFile({
          name: file.name,
          filed: true,
          size: Math.round(file.size / 1000) + " Ko",
        });
        setPreviewData(
          lines.map((line) => {
            return line.split(separator);
          })
        );
      } catch (error) {
        console.error("Erreur lors de la lecture du fichier : ", error);
      }
    } else {
      console.log("le meme fichier a été sélectionné.");
    }
  };

  const readFilesContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        resolve(event.target.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  };

  const detectSeparator = (content) => {
    if (content.includes("\t")) {
      return "\t";
    } else if (content.includes(";")) {
      return ";";
    } else if (content.includes("|")) {
      return "|";
    } else if (content.includes(",")) {
      return ",";
    } else {
      return ";";
    }
  };

  const generateModifiedFileContent = (separator) => {
    if (previewData) {
      const modifiedContent = previewData
        .map((row) => row.join(separator))
        .join("\n");
      return modifiedContent;
    }
    return "";
  };

  const dowloadModifiedFile = () => {
    const modifiedContent = generateModifiedFileContent();
    if (modifiedContent) {
      const blob = new Blob([modifiedContent], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download =
        depositedFile.name.substring(0, depositedFile.name.indexOf(".")) +
        "(copie).txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.stickywrapper}>
          <div className={styles.navbar}>
            <Image width={30} height={30} src={moneycash} alt="logo" />
            <p>ConvertMyFec</p>
          </div>
        </div>
      </header>
      <main>
        <h1 className={styles.title}>Convertisseur de FEC</h1>
        <div className={styles.depot}>
          <div className={styles.flex}>
            <p className={styles.number}>1</p>
            <label className={styles.label} htmlFor="file-upload">
              Déposer votre FEC ici
              <Image width={30} height={30} src={filefind} alt="file" />
            </label>
            <input
              className={styles.input}
              type="file"
              id="file-upload"
              name="file-upload"
              accept=".txt"
              aria-placeholder="déposer votre FEC ici"
              placeholder="Déposer votre FEC"
              onChange={handleFileChange}
            ></input>
          </div>
          <div
            className={
              depositedFile.filed ? styles.depotprev : styles.depotnotprev
            }
          >
            <div className={styles.filetext}>
              <Image fill src={filetext} alt="filetext" />
            </div>
            <p>{depositedFile.name}</p>
            <p>{depositedFile.size}</p>
            <div className={styles.imgcross}>
              <Image fill src={cross} alt="cross" onClick={handleResetFile} />
            </div>
          </div>
          <p className={styles.explication}>
            Cette application vise à changer rapidement la racine des comptes
            auxiliaires des fournisseurs et clients dans un FEC. Au lieu de
            réaliser cette tâche via un tableur, ce qui peut prendre de 5 à 10
            minutes, vous pouvez le faire en 30 secondes !! Pour cela, laissez-vous guider par les numéros.
          </p>
        </div>
        <div className={styles.containeraux}>
          <div className={styles.items}>
            <div className={styles.flex}>
              <p className={styles.number}>2</p>
              <h2 className={styles.itemstitle}>Section Frns</h2>
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="Indiquer la racine des cptes aux frns"
              name="oldFrns"
              onChange={handleAuxChange}
            ></input>
            <input
              className={styles.input}
              type="text"
              placeholder="Racine des cptes aux frns voulus"
              name="newFrns"
              onChange={handleAuxChange}
            ></input>
          </div>
          <div className={styles.items}>
            <div className={styles.flex}>
              <p className={styles.number}>3</p>
              <h2 className={styles.itemstitle}>Section Clts</h2>
            </div>
            <input
              className={styles.input}
              type="text"
              placeholder="Indiquer la racine des cptes aux clts"
              name="oldClts"
              onChange={handleAuxChange}
            ></input>
            <input
              className={styles.input}
              type="text"
              placeholder="Racine des cptes aux clts voulus"
              name="newClts"
              onChange={handleAuxChange}
            ></input>
          </div>
        </div>
        <div className={styles.containerprev}>
          <div className={styles.left}>
            <p className={styles.number}>4</p>
            <button onClick={handleModify} className={styles.rightbutton}>
              Appliquer <br /> les modifications
            </button>
          </div>
          <div className={styles.center}>
            {previewData && previewData.length > 0 ? (
              <table className={styles.table}>
                <thead className={styles.head}>
                  <tr className={styles.headtr}>
                    {...previewData[0].slice(4, 8).map((item, index) => (
                      <th className={styles.headth} key={index}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {...previewData.slice(1).map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row
                        .map((cell, cellIndex) => (
                          <td className={styles.td} key={cellIndex}>
                            {cell}
                          </td>
                        ))
                        .slice(4, 8)}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className={styles.centertext}>
                Zone de prévisualisation du FEC. <br /> Seules les colonnes
                relatives aux numéros de compte seront affichées.
              </p>
            )}
          </div>
          <div className={styles.right}>
            <p className={styles.number}>5</p>
            <button
              onClick={dowloadModifiedFile}
              className={styles.rightbutton}
            >
              Télécharger <br /> le FEC modifié
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
