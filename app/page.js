"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import moneycash from "public/money-cash.svg";
import filefind from "public/file-find.svg";
import filetext from "public/file-text.svg";
import cross from "public/cross-mark.svg";
import Footer from "./components/Footer";
import Papa from "papaparse";

export default function Home() {
  const [data, setData] = useState([]);
  const [column, setColumn] = useState([]);
  const [values, setValues] = useState([]);
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

  // function => ok
  const handleFile = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        const columnArray = [];
        const valuesArray = [];
        result.data.map((data) => {
          columnArray.push(Object.keys(data));
          valuesArray.push(Object.values(data));
        });
        setData(result.data);
        setColumn(columnArray[0]);
        setValues(valuesArray);
        setDepositedFile({
          name: file.name,
          filed: true,
          size: Math.round(file.size / 1000) + " Ko",
        });
      },
    });
  };
  // function => ok
  const handleAuxChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };
  // function => ok
  function substitueSpace(str, oldChar, newChar) {
    return str.replace(new RegExp(oldChar, "g"), newChar);
  }
  // function => ok
  const handleResetFile = () => {
    if (depositedFile.filed) {
      const fileInputs = document.querySelectorAll(".page_input__lx_gt");
      fileInputs.forEach((input) => {
        input.value = null;
      });
      setDepositedFile({ name: "", filed: false, size: "" });
      setData([]);
      setInputData({ oldFrns: "", oldClts: "", newFrns: "", newClts: "" });
      setColumn([])
      setValues([])
    }
  };
  // function => ok
  const applyModification = (elemAux, oldKey, newKey, modifiedElement) => {
    if (elemAux && oldKey != "" && newKey!= "" && elemAux.startsWith(substitueSpace(oldKey, " ", ""))) {
      const modifiedValue =
        substitueSpace(newKey, " ", "") +
        elemAux.slice(substitueSpace(oldKey, " ", "").length);
      return { ...modifiedElement, CompAuxNum: modifiedValue };
    }
    return modifiedElement;
  };
  // function => ok
  const handleModify = () => {
    if (data.length > 1) {
      const sectionInputs = document.querySelectorAll(
        ".page_items__yzFf6 .page_input__lx_gt"
      );
      const modifiedData = data.map((element) => {
        let elemAux = element.CompAuxNum;
        let modifiedElement = { ...element };
        modifiedElement = applyModification(elemAux, inputData.oldFrns, inputData.newFrns, modifiedElement)
        modifiedElement = applyModification(elemAux, inputData.oldClts, inputData.newClts, modifiedElement)
        return modifiedElement;
      });
      setData(modifiedData);
      setValues(modifiedData);
      sectionInputs.forEach((input) => {
        input.value = null;
      });
      setInputData({ oldFrns: "", oldClts: "", newFrns: "", newClts: "" });
    }
  };
  // function => ok
  const downloadModifiedFile = () => {
    const newCSV = Papa.unparse(data, {delimiter: ";"});
    const blob = new Blob([newCSV], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download =
      depositedFile.name.substring(0, depositedFile.name.indexOf(".")) +
      "(copie).txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              onChange={handleFile}
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
            minutes, vous pouvez le faire en 30 secondes !! Pour cela,
            laissez-vous guider par les numéros.
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
              placeholder="Saisir la racine auxiliaire frns actuelle"
              name="oldFrns"
              onChange={handleAuxChange}
            ></input>
            <input
              className={styles.input}
              type="text"
              placeholder="Saisir la racine auxiliaire frns voulus"
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
              placeholder="Saisir la racine auxiliaire clts actuelle"
              name="oldClts"
              onChange={handleAuxChange}
            ></input>
            <input
              className={styles.input}
              type="text"
              placeholder="Saisir la racine auxiliaire clts voulus"
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
            {data && data.length > 0 ? (
              <table className={styles.table}>
                <thead className={styles.head}>
                  <tr className={styles.headtr}>
                    {column.slice(4, 8).map((item, index) => (
                      <th className={styles.headth} key={index}>
                        {item}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {values.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.values(row)
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
              onClick={downloadModifiedFile}
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
