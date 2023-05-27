import "./Sell.scss";
import TextInput from "@/components/TextInput/TextInput.tsx";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import React, { useContext, useEffect, useRef } from "react";
import { setTitle } from "@/utils.tsx";
import Button from "@/components/Button/Button.tsx";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "@/App.tsx";

const Sell = () => {
  const { user } = useContext(UserContext);

  const listingData = useRef<HTMLFormElement>(null);
  const listingType = useRef<HTMLSelectElement>(null);
  const listingImage = useRef<HTMLInputElement>(null);
  const listingName = useRef<HTMLInputElement>(null);
  const listingAddress = useRef<HTMLInputElement>(null);
  const listingRegion = useRef<HTMLInputElement>(null);
  const listingCountry = useRef<HTMLSelectElement>(null);
  const listingBedrooms = useRef<HTMLInputElement>(null);
  const listingBathrooms = useRef<HTMLInputElement>(null);
  const listingArea = useRef<HTMLInputElement>(null);
  const listingPrice = useRef<HTMLInputElement>(null);
  const listingDescription = useRef<HTMLTextAreaElement>(null);

  const createListing = async (e) => {
    e.preventDefault();

    let valid = true;

    Array.from(listingData.current.elements).forEach((elem) => {
      // @ts-ignore
      elem.checkValidity();
      // @ts-ignore
      if (!elem.reportValidity()) {
        valid = false;
      }
    });

    if (!valid) {
      return;
    }

    const type = listingType.current;
    const image = listingImage.current;
    const name = listingName.current;
    const address = listingAddress.current;
    const region = listingRegion.current;
    const country = listingCountry.current;
    const bedrooms = listingBedrooms.current;
    const bathrooms = listingBathrooms.current;
    const area = listingArea.current;
    const price = listingPrice.current;
    const description = listingDescription.current;

    const data = new FormData();
    data.append("token", user.accessToken);
    data.append("uid", user.uid);
    data.append("hauntingType", type.value);
    data.append("name", name.value);
    data.append("address", address.value);
    data.append("region", region.value);
    data.append("country", country.value);
    data.append("bedrooms", bedrooms.value);
    data.append("bathrooms", bathrooms.value);
    data.append("area", area.value);
    data.append("price", price.value);
    data.append("description", description.value);
    data.append("file", image.files[0]);
    data.append("fileName", image.files[0].name);
    console.log(data);

    await axios({
      method: "POST",
      url: "http://localhost:8080/listings",
      data,
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  };

  useEffect(() => {
    setTitle("Create a listing");
  });

  return (
    <div id={"sell-page"}>
      <Card className={"new-listing-info"}>
        <CardTitle>Create a new listing</CardTitle>
        <CardContent>
          <form id={"listing-form"} ref={listingData}>
            <div className={"form-col"}>
              <div className={"form-line"}>
                <p className={"label-wrapper required"}>
                  <label htmlFor={"listing-haunting"}>
                    Haunting type{" "}
                    <Link to={"/guide#types-of-hauntings"} target={"_blank"}>
                      (?)
                    </Link>
                  </label>
                </p>
                <select
                  className={"underline"}
                  id={"listing-haunting"}
                  name={"hauntingType"}
                  required
                  ref={listingType}
                >
                  <option value={"unknown"}>Unknown</option>
                  <option value={"inhuman"}>Inhuman</option>
                  <option value={"intelligent"}>Intelligent</option>
                  <option value={"poltergeist"}>Poltergeist</option>
                  <option value={"residual"}>Residual</option>
                </select>
              </div>
              <div className={"form-line"}>
                <TextInput
                  id={"listing-image"}
                  label={"Listing image"}
                  type={"file"}
                  name={"image"}
                  style={"none"}
                  required
                  accept={".jpeg,.jpg,.png"}
                  ref={listingImage}
                />
              </div>
              <div className={"form-line"}>
                <TextInput
                  id={"listing-name"}
                  name={"name"}
                  label={"Name"}
                  placeholder={"e.g. Terrifying Townhouse"}
                  required
                  ref={listingName}
                />
              </div>
              <div className={"form-line"}>
                <TextInput
                  id={"listing-address"}
                  name={"address"}
                  label={"Address"}
                  placeholder={"e.g. 123 Main St., Springfield"}
                  ref={listingAddress}
                />
              </div>
              <div className={"form-line"}>
                <TextInput
                  id={"listing-region"}
                  name={"region"}
                  label={"Region"}
                  placeholder={"e.g. Oregon"}
                  required
                  ref={listingRegion}
                />
              </div>
              <div className={"form-line"}>
                {/* https://html-code-generator.com/html/drop-down/country-names */}
                <p className={"label-wrapper required"}>
                  <label htmlFor={"listing-country"}>Country</label>
                </p>
                <select
                  className={"underline"}
                  id={"listing-country"}
                  name={"country"}
                  required
                  ref={listingCountry}
                >
                  <option value={"United States"}>United States</option>
                  <option value={"Afghanistan"}>Afghanistan</option>
                  <option value={"Aland Islands"}>Aland Islands</option>
                  <option value={"Albania"}>Albania</option>
                  <option value={"Algeria"}>Algeria</option>
                  <option value={"American Samoa"}>American Samoa</option>
                  <option value={"Andorra"}>Andorra</option>
                  <option value={"Angola"}>Angola</option>
                  <option value={"Anguilla"}>Anguilla</option>
                  <option value={"Antarctica"}>Antarctica</option>
                  <option value={"Antigua and Barbuda"}>
                    Antigua and Barbuda
                  </option>
                  <option value={"Argentina"}>Argentina</option>
                  <option value={"Armenia"}>Armenia</option>
                  <option value={"Aruba"}>Aruba</option>
                  <option value={"Australia"}>Australia</option>
                  <option value={"Austria"}>Austria</option>
                  <option value={"Azerbaijan"}>Azerbaijan</option>
                  <option value={"Bahamas"}>Bahamas</option>
                  <option value={"Bahrain"}>Bahrain</option>
                  <option value={"Bangladesh"}>Bangladesh</option>
                  <option value={"Barbados"}>Barbados</option>
                  <option value={"Belarus"}>Belarus</option>
                  <option value={"Belgium"}>Belgium</option>
                  <option value={"Belize"}>Belize</option>
                  <option value={"Benin"}>Benin</option>
                  <option value={"Bermuda"}>Bermuda</option>
                  <option value={"Bhutan"}>Bhutan</option>
                  <option value={"Bolivia"}>Bolivia</option>
                  <option value={"Bonaire, Sint Eustatius and Saba"}>
                    Bonaire, Sint Eustatius and Saba
                  </option>
                  <option value={"Bosnia and Herzegovina"}>
                    Bosnia and Herzegovina
                  </option>
                  <option value={"Botswana"}>Botswana</option>
                  <option value={"Bouvet Island"}>Bouvet Island</option>
                  <option value={"Brazil"}>Brazil</option>
                  <option value={"British Indian Ocean Territory"}>
                    British Indian Ocean Territory
                  </option>
                  <option value={"Brunei Darussalam"}>Brunei Darussalam</option>
                  <option value={"Bulgaria"}>Bulgaria</option>
                  <option value={"Burkina Faso"}>Burkina Faso</option>
                  <option value={"Burundi"}>Burundi</option>
                  <option value={"Cambodia"}>Cambodia</option>
                  <option value={"Cameroon"}>Cameroon</option>
                  <option value={"Canada"}>Canada</option>
                  <option value={"Cape Verde"}>Cape Verde</option>
                  <option value={"Cayman Islands"}>Cayman Islands</option>
                  <option value={"Central African Republic"}>
                    Central African Republic
                  </option>
                  <option value={"Chad"}>Chad</option>
                  <option value={"Chile"}>Chile</option>
                  <option value={"China"}>China</option>
                  <option value={"Christmas Island"}>Christmas Island</option>
                  <option value={"Cocos (Keeling) Islands"}>
                    Cocos (Keeling) Islands
                  </option>
                  <option value={"Colombia"}>Colombia</option>
                  <option value={"Comoros"}>Comoros</option>
                  <option value={"Congo"}>Congo</option>
                  <option value={"Congo, Democratic Republic of the Congo"}>
                    Congo, Democratic Republic of the Congo
                  </option>
                  <option value={"Cook Islands"}>Cook Islands</option>
                  <option value={"Costa Rica"}>Costa Rica</option>
                  <option value={"Cote D'Ivoire"}>Cote D'Ivoire</option>
                  <option value={"Croatia"}>Croatia</option>
                  <option value={"Cuba"}>Cuba</option>
                  <option value={"Curacao"}>Curacao</option>
                  <option value={"Cyprus"}>Cyprus</option>
                  <option value={"Czech Republic"}>Czech Republic</option>
                  <option value={"Denmark"}>Denmark</option>
                  <option value={"Djibouti"}>Djibouti</option>
                  <option value={"Dominica"}>Dominica</option>
                  <option value={"Dominican Republic"}>
                    Dominican Republic
                  </option>
                  <option value={"Ecuador"}>Ecuador</option>
                  <option value={"Egypt"}>Egypt</option>
                  <option value={"El Salvador"}>El Salvador</option>
                  <option value={"Equatorial Guinea"}>Equatorial Guinea</option>
                  <option value={"Eritrea"}>Eritrea</option>
                  <option value={"Estonia"}>Estonia</option>
                  <option value={"Ethiopia"}>Ethiopia</option>
                  <option value={"Falkland Islands (Malvinas)"}>
                    Falkland Islands (Malvinas)
                  </option>
                  <option value={"Faroe Islands"}>Faroe Islands</option>
                  <option value={"Fiji"}>Fiji</option>
                  <option value={"Finland"}>Finland</option>
                  <option value={"France"}>France</option>
                  <option value={"French Guiana"}>French Guiana</option>
                  <option value={"French Polynesia"}>French Polynesia</option>
                  <option value={"French Southern Territories"}>
                    French Southern Territories
                  </option>
                  <option value={"Gabon"}>Gabon</option>
                  <option value={"Gambia"}>Gambia</option>
                  <option value={"Georgia"}>Georgia</option>
                  <option value={"Germany"}>Germany</option>
                  <option value={"Ghana"}>Ghana</option>
                  <option value={"Gibraltar"}>Gibraltar</option>
                  <option value={"Greece"}>Greece</option>
                  <option value={"Greenland"}>Greenland</option>
                  <option value={"Grenada"}>Grenada</option>
                  <option value={"Guadeloupe"}>Guadeloupe</option>
                  <option value={"Guam"}>Guam</option>
                  <option value={"Guatemala"}>Guatemala</option>
                  <option value={"Guernsey"}>Guernsey</option>
                  <option value={"Guinea"}>Guinea</option>
                  <option value={"Guinea-Bissau"}>Guinea-Bissau</option>
                  <option value={"Guyana"}>Guyana</option>
                  <option value={"Haiti"}>Haiti</option>
                  <option value={"Heard Island and Mcdonald Islands"}>
                    Heard Island and Mcdonald Islands
                  </option>
                  <option value={"Holy See (Vatican City State)"}>
                    Holy See (Vatican City State)
                  </option>
                  <option value={"Honduras"}>Honduras</option>
                  <option value={"Hong Kong"}>Hong Kong</option>
                  <option value={"Hungary"}>Hungary</option>
                  <option value={"Iceland"}>Iceland</option>
                  <option value={"India"}>India</option>
                  <option value={"Indonesia"}>Indonesia</option>
                  <option value={"Iran, Islamic Republic of"}>
                    Iran, Islamic Republic of
                  </option>
                  <option value={"Iraq"}>Iraq</option>
                  <option value={"Ireland"}>Ireland</option>
                  <option value={"Isle of Man"}>Isle of Man</option>
                  <option value={"Israel"}>Israel</option>
                  <option value={"Italy"}>Italy</option>
                  <option value={"Jamaica"}>Jamaica</option>
                  <option value={"Japan"}>Japan</option>
                  <option value={"Jersey"}>Jersey</option>
                  <option value={"Jordan"}>Jordan</option>
                  <option value={"Kazakhstan"}>Kazakhstan</option>
                  <option value={"Kenya"}>Kenya</option>
                  <option value={"Kiribati"}>Kiribati</option>
                  <option value={"Korea, Democratic People's Republic of"}>
                    Korea, Democratic People's Republic of
                  </option>
                  <option value={"Korea, Republic of"}>
                    Korea, Republic of
                  </option>
                  <option value={"Kosovo"}>Kosovo</option>
                  <option value={"Kuwait"}>Kuwait</option>
                  <option value={"Kyrgyzstan"}>Kyrgyzstan</option>
                  <option value={"Lao People's Democratic Republic"}>
                    Lao People's Democratic Republic
                  </option>
                  <option value={"Latvia"}>Latvia</option>
                  <option value={"Lebanon"}>Lebanon</option>
                  <option value={"Lesotho"}>Lesotho</option>
                  <option value={"Liberia"}>Liberia</option>
                  <option value={"Libyan Arab Jamahiriya"}>
                    Libyan Arab Jamahiriya
                  </option>
                  <option value={"Liechtenstein"}>Liechtenstein</option>
                  <option value={"Lithuania"}>Lithuania</option>
                  <option value={"Luxembourg"}>Luxembourg</option>
                  <option value={"Macao"}>Macao</option>
                  <option value={"Macedonia, the Former Yugoslav Republic of"}>
                    Macedonia, the Former Yugoslav Republic of
                  </option>
                  <option value={"Madagascar"}>Madagascar</option>
                  <option value={"Malawi"}>Malawi</option>
                  <option value={"Malaysia"}>Malaysia</option>
                  <option value={"Maldives"}>Maldives</option>
                  <option value={"Mali"}>Mali</option>
                  <option value={"Malta"}>Malta</option>
                  <option value={"Marshall Islands"}>Marshall Islands</option>
                  <option value={"Martinique"}>Martinique</option>
                  <option value={"Mauritania"}>Mauritania</option>
                  <option value={"Mauritius"}>Mauritius</option>
                  <option value={"Mayotte"}>Mayotte</option>
                  <option value={"Mexico"}>Mexico</option>
                  <option value={"Micronesia, Federated States of"}>
                    Micronesia, Federated States of
                  </option>
                  <option value={"Moldova, Republic of"}>
                    Moldova, Republic of
                  </option>
                  <option value={"Monaco"}>Monaco</option>
                  <option value={"Mongolia"}>Mongolia</option>
                  <option value={"Montenegro"}>Montenegro</option>
                  <option value={"Montserrat"}>Montserrat</option>
                  <option value={"Morocco"}>Morocco</option>
                  <option value={"Mozambique"}>Mozambique</option>
                  <option value={"Myanmar"}>Myanmar</option>
                  <option value={"Namibia"}>Namibia</option>
                  <option value={"Nauru"}>Nauru</option>
                  <option value={"Nepal"}>Nepal</option>
                  <option value={"Netherlands"}>Netherlands</option>
                  <option value={"Netherlands Antilles"}>
                    Netherlands Antilles
                  </option>
                  <option value={"New Caledonia"}>New Caledonia</option>
                  <option value={"New Zealand"}>New Zealand</option>
                  <option value={"Nicaragua"}>Nicaragua</option>
                  <option value={"Niger"}>Niger</option>
                  <option value={"Nigeria"}>Nigeria</option>
                  <option value={"Niue"}>Niue</option>
                  <option value={"Norfolk Island"}>Norfolk Island</option>
                  <option value={"Northern Mariana Islands"}>
                    Northern Mariana Islands
                  </option>
                  <option value={"Norway"}>Norway</option>
                  <option value={"Oman"}>Oman</option>
                  <option value={"Pakistan"}>Pakistan</option>
                  <option value={"Palau"}>Palau</option>
                  <option value={"Palestinian Territory, Occupied"}>
                    Palestinian Territory, Occupied
                  </option>
                  <option value={"Panama"}>Panama</option>
                  <option value={"Papua New Guinea"}>Papua New Guinea</option>
                  <option value={"Paraguay"}>Paraguay</option>
                  <option value={"Peru"}>Peru</option>
                  <option value={"Philippines"}>Philippines</option>
                  <option value={"Pitcairn"}>Pitcairn</option>
                  <option value={"Poland"}>Poland</option>
                  <option value={"Portugal"}>Portugal</option>
                  <option value={"Puerto Rico"}>Puerto Rico</option>
                  <option value={"Qatar"}>Qatar</option>
                  <option value={"Reunion"}>Reunion</option>
                  <option value={"Romania"}>Romania</option>
                  <option value={"Russian Federation"}>
                    Russian Federation
                  </option>
                  <option value={"Rwanda"}>Rwanda</option>
                  <option value={"Saint Barthelemy"}>Saint Barthelemy</option>
                  <option value={"Saint Helena"}>Saint Helena</option>
                  <option value={"Saint Kitts and Nevis"}>
                    Saint Kitts and Nevis
                  </option>
                  <option value={"Saint Lucia"}>Saint Lucia</option>
                  <option value={"Saint Martin"}>Saint Martin</option>
                  <option value={"Saint Pierre and Miquelon"}>
                    Saint Pierre and Miquelon
                  </option>
                  <option value={"Saint Vincent and the Grenadines"}>
                    Saint Vincent and the Grenadines
                  </option>
                  <option value={"Samoa"}>Samoa</option>
                  <option value={"San Marino"}>San Marino</option>
                  <option value={"Sao Tome and Principe"}>
                    Sao Tome and Principe
                  </option>
                  <option value={"Saudi Arabia"}>Saudi Arabia</option>
                  <option value={"Senegal"}>Senegal</option>
                  <option value={"Serbia"}>Serbia</option>
                  <option value={"Serbia and Montenegro"}>
                    Serbia and Montenegro
                  </option>
                  <option value={"Seychelles"}>Seychelles</option>
                  <option value={"Sierra Leone"}>Sierra Leone</option>
                  <option value={"Singapore"}>Singapore</option>
                  <option value={"Sint Maarten"}>Sint Maarten</option>
                  <option value={"Slovakia"}>Slovakia</option>
                  <option value={"Slovenia"}>Slovenia</option>
                  <option value={"Solomon Islands"}>Solomon Islands</option>
                  <option value={"Somalia"}>Somalia</option>
                  <option value={"South Africa"}>South Africa</option>
                  <option
                    value={"South Georgia and the South Sandwich Islands"}
                  >
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value={"South Sudan"}>South Sudan</option>
                  <option value={"Spain"}>Spain</option>
                  <option value={"Sri Lanka"}>Sri Lanka</option>
                  <option value={"Sudan"}>Sudan</option>
                  <option value={"Suriname"}>Suriname</option>
                  <option value={"Svalbard and Jan Mayen"}>
                    Svalbard and Jan Mayen
                  </option>
                  <option value={"Swaziland"}>Swaziland</option>
                  <option value={"Sweden"}>Sweden</option>
                  <option value={"Switzerland"}>Switzerland</option>
                  <option value={"Syrian Arab Republic"}>
                    Syrian Arab Republic
                  </option>
                  <option value={"Taiwan, Province of China"}>
                    Taiwan, Province of China
                  </option>
                  <option value={"Tajikistan"}>Tajikistan</option>
                  <option value={"Tanzania, United Republic of"}>
                    Tanzania, United Republic of
                  </option>
                  <option value={"Thailand"}>Thailand</option>
                  <option value={"Timor-Leste"}>Timor-Leste</option>
                  <option value={"Togo"}>Togo</option>
                  <option value={"Tokelau"}>Tokelau</option>
                  <option value={"Tonga"}>Tonga</option>
                  <option value={"Trinidad and Tobago"}>
                    Trinidad and Tobago
                  </option>
                  <option value={"Tunisia"}>Tunisia</option>
                  <option value={"Turkey"}>Turkey</option>
                  <option value={"Turkmenistan"}>Turkmenistan</option>
                  <option value={"Turks and Caicos Islands"}>
                    Turks and Caicos Islands
                  </option>
                  <option value={"Tuvalu"}>Tuvalu</option>
                  <option value={"Uganda"}>Uganda</option>
                  <option value={"Ukraine"}>Ukraine</option>
                  <option value={"United Arab Emirates"}>
                    United Arab Emirates
                  </option>
                  <option value={"United Kingdom"}>United Kingdom</option>
                  <option value={"United States Minor Outlying Islands"}>
                    United States Minor Outlying Islands
                  </option>
                  <option value={"Uruguay"}>Uruguay</option>
                  <option value={"Uzbekistan"}>Uzbekistan</option>
                  <option value={"Vanuatu"}>Vanuatu</option>
                  <option value={"Venezuela"}>Venezuela</option>
                  <option value={"Viet Nam"}>Viet Nam</option>
                  <option value={"Virgin Islands, British"}>
                    Virgin Islands, British
                  </option>
                  <option value={"Virgin Islands, U.s."}>
                    Virgin Islands, U.s.
                  </option>
                  <option value={"Wallis and Futuna"}>Wallis and Futuna</option>
                  <option value={"Western Sahara"}>Western Sahara</option>
                  <option value={"Yemen"}>Yemen</option>
                  <option value={"Zambia"}>Zambia</option>
                  <option value={"Zimbabwe"}>Zimbabwe</option>
                </select>
              </div>
            </div>
            <div className={"form-col"}>
              <div className={"form-line"}>
                <TextInput
                  type={"number"}
                  id={"listing-bedrooms"}
                  name={"bedrooms"}
                  placeholder={"0"}
                  rightText={"bds"}
                  label={"Bedrooms"}
                  required
                  ref={listingBedrooms}
                  min={0}
                />
              </div>
              <div className={"form-line"}>
                <TextInput
                  type={"number"}
                  id={"listing-bathrooms"}
                  name={"bathrooms"}
                  placeholder={"0"}
                  rightText={"ba"}
                  label={"Bathrooms"}
                  required
                  ref={listingBathrooms}
                  min={0}
                />
              </div>
              <div className={"form-line"}>
                <TextInput
                  type={"number"}
                  id={"listing-area"}
                  name={"area"}
                  placeholder={"0"}
                  rightText={"sq ft"}
                  label={"Square feet"}
                  required
                  ref={listingArea}
                  min={0}
                />
              </div>
              <div className={"form-line"}>
                <TextInput
                  type={"number"}
                  id={"listing-price"}
                  name={"price"}
                  placeholder={"0"}
                  leftText={"$"}
                  label={"Price"}
                  required
                  ref={listingPrice}
                  min={0}
                />
              </div>
              <div className={"form-line"}>
                <p className={"label-wrapper required"}>
                  <label htmlFor={"listing-description"}>Description</label>
                </p>
                <textarea
                  id={"listing-description"}
                  name={"description"}
                  placeholder={"Describe your property..."}
                  rows={5}
                  required
                  className={"underline"}
                  ref={listingDescription}
                ></textarea>
              </div>
            </div>
            <div className={"form-line span-full"}>
              <Button type={"submit"} color={"primary"} onClick={createListing}>
                Create listing
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Sell;
