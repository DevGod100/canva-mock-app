import { upload } from "@canva/asset";
import { addNativeElement } from "@canva/design";


import * as React from "react";
import { useEffect, useState } from "react";
import "./MainApp.css";
import styles from "styles/components.css";

import { hundredImages } from "./hundredImages";

export const App = () => {
  const [URLs, setURLs] = useState<string[]>([]);

  useEffect(() => {
    // Set the URLs state with the extracted URLs
    setURLs(hundredImages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sanitizeForID(input) {
    // Remove special characters and spaces using a regular expression
    return input.replace(/[^a-zA-Z0-9]/g, "");
  }

  const handleImageClick = async (theURL: string) => {
    const idPortion = sanitizeForID(theURL.split('/').pop());
    console.log(idPortion);

      const urlll =  "https://storage.googleapis.com/bucket-quickstart_munn-ai/zakk87/zakk87_15._a_mesmerizing_kaleidoscope_of_patterns_and_colors._4_a4ed3df2-0491-4f64-898c-5ae3bb39e8b5.webp"
    try {
      // Upload the clicked image to the user's UI
      const result = await upload({
        type: "IMAGE",
        id: idPortion,
        mimeType: "image/webp",
        url: urlll,
        thumbnailUrl: urlll,
      });

      // Log the reference for reference (you can handle it as needed)
      console.log("The reference for the uploaded image is:", result.ref);
      await addNativeElement({
        type: "IMAGE",
        ref: result.ref,
      });
      await result.whenUploaded();
console.log("The upload is complete.");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  return (
    <div className={styles.scrollContainer}>
      <div style={{ display: "flex", gap: "10px" }}>
        <div className="columnStyle">
          {URLs.map((theURL, index) => (
            <div
              key={index}
              style={{ flex: "1 0 calc(50% - 5px)", marginBottom: "10px" }}
            >
              <img
                onClick={() => handleImageClick(theURL)}
                className="imageStyle"
                src={theURL}
                alt={`Image ${index}`}
              />
            </div>
          ))}
        </div>
        <div className="columnStyle"> {/* Use className to apply the CSS class */}
          {URLs.slice(Math.ceil(URLs.length / 2)).map((theURL, index) => (
             <div key={index} style={{ marginBottom: "10px"}}>
            <img
              onClick={() => handleImageClick(theURL)}
              className="imageStyle"// Use className to apply the CSS class
              src={theURL}
              alt={`Image ${index}`}
            />
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};