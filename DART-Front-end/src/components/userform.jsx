import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./userform.css";

const countryCodes = {
  "Sri Lanka": "+94",
  India: "+91",
  UK: "+44",
  USA: "+1",
};

const UserForm = () => {
  const [step, setStep] = useState(1);
  const formRefs = useRef([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    contact: "",
    cadDesign: "",
    cadFile: null,
    pdfSplDoc: "",
    pdfFile: null,
    boqStandard: "",
    collectionMethod: "",
  });

  useEffect(() => {
    if (formRefs.current[step - 1]) {
      formRefs.current[step - 1].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = () => {
    if (step < 7) setStep(step + 1);
  };


  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Add the user's email to the form data
    const loggedInUserEmail =
      localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");
    if (!loggedInUserEmail) {
      alert("User email is missing. Please log in again.");
      return;
    }
    formDataToSend.append("user_email", loggedInUserEmail);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/submit-form/", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Form submitted successfully!");

        // Clear the form and redirect to WelcomeToDart page
        setFormData({
          name: "",
          country: "",
          contact: "",
          cadFile: null,
          pdfSplDoc: "",
          pdfFile: null,
          boqStandard: "",
          collectionMethod: "",
        });
        navigate("/thank");
      } else {
        alert(result.error || "Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Put your information</h2>
      <p className="step-label">Step {step} of 7</p>

      <div className="form-steps-stacked">
        {/* Step 1: Name */}
        <div ref={(el) => (formRefs.current[0] = el)} className="form-step">
          <label>What is your name?</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* Step 2: Country */}
        {step >= 2 && (
          <div ref={(el) => (formRefs.current[1] = el)} className="form-step">
            <label>Country</label>
            <select name="country" value={formData.country} onChange={handleChange} required>
              <option value="">-- Select Country --</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="India">India</option>
              <option value="UK">UK</option>
              <option value="USA">USA</option>
            </select>
          </div>
        )}

        {/* Step 3: Contact Number */}
        {step >= 3 && (
          <div ref={(el) => (formRefs.current[2] = el)} className="form-step">
            <label>Contact Number (with country code)</label>
            <input
              type="tel"
              name="contact"
              placeholder={formData.country ? `${countryCodes[formData.country]}XXXXXXXXX` : "+94XXXXXXXXX"}
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {/* Step 4: CAD Design + file */}
        {step >= 4 && (
          <div className="form-substep">
            <label>Upload CAD File</label>
            <input
              type="file"
              name="cadFile"
              onChange={handleChange}
              accept=".pdf,.dwg,.dxf,.zip"
            />
            {formData.cadFile && (
              <div className="cad-file-name">
                <strong>CAD Design:</strong> {formData.cadFile.name}
              </div>
            )}
          </div>

        )}

        {/* Step 5: PDF SPL + file */}
        {step >= 5 && (
          <div ref={(el) => (formRefs.current[4] = el)} className="form-step">
            <label>PDF SPL Document</label>
            <select name="pdfSplDoc" value={formData.pdfSplDoc} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="Attached">Attached</option>
              <option value="Not available">Not available</option>
            </select>
            {formData.pdfSplDoc === "Attached" && (
              <div className="form-substep">
                <label>Upload PDF Document</label>
                <input type="file" name="pdfFile" onChange={handleChange} accept=".pdf,.doc,.docx" />
              </div>
            )}
          </div>
        )}

        {/* Step 6: BoQ */}
        {step >= 6 && (
          <div ref={(el) => (formRefs.current[5] = el)} className="form-step">
            <label>BoQ Standard</label>
            <select name="boqStandard" value={formData.boqStandard} onChange={handleChange}>
              <option value="">-- Select Standard --
              </option>
              <option value="SLS 573">SLS 573
              </option>
              <option value="POMI">POMI
              </option>
              <option value="SRM 274">SRM 274 / SCA/4/1
              </option>
              <option value="BOMI">BOMI
              </option>
              <option value="CPWD DSR">CPWD DSR
              </option>
              <option value="IS 1200">IS 1200
              </option>
              <option value="CSI MasterFormat">CSI MasterFormat
              </option>
              <option value="ANZSMM">ANZSMM
              </option>
              <option value="CESMM4">CESMM4
              </option>
              <option value="FIDIC BOQ">FIDIC BOQ
              </option>
              <option value="SMM7">SMM7</option>
              <option value="Other">Other</option>
            </select>
          </div>
        )}

        {/* Step 7: Collection Method */}
        {step >= 7 && (
          <div ref={(el) => (formRefs.current[6] = el)} className="form-step">
            <label>How would you like us to collect your details?</label>
            <select name="collectionMethod" value={formData.collectionMethod} onChange={handleChange}>
              <option value="">-- Choose Method --</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="Drive">Google Drive</option>
              <option value="Dart App">Dart App</option>
            </select>
          </div>
        )}
      </div>

      <div className="button-group">
        {step > 1 && (
          <button className="next-button" onClick={() => setStep(step - 1)}>
            Back
          </button>
        )}
        {step < 7 ? (
          <button className="next-button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};


export default UserForm;
