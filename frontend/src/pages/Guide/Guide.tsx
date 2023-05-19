import "./Guide.scss";
import Card, { CardContent, CardTitle } from "@/components/Card/Card.tsx";
import BackToTop from "@/components/BackToTop/BackToTop.tsx";

const Guide = () => {
  return (
    <>
      <article id={"guide-page"}>
        <section className={"guide-contents"}>
          <Card>
            <CardTitle>Contents</CardTitle>
            <CardContent>
              <ol>
                <li>
                  <a href={"#why-should-i-buy-a-haunted-home"}>
                    Why should I buy a haunted home?
                  </a>
                </li>
                <li>
                  <a href={"#types-of-hauntings"}>Types of hauntings</a>
                  <ol>
                    <li>
                      <a href={"#guide-intelligent"}>Intelligent</a>
                    </li>
                    <li>
                      <a href={"#guide-residual"}>Residual</a>
                    </li>
                    <li>
                      <a href={"#guide-poltergeist"}>Poltergeist</a>
                    </li>
                    <li>
                      <a href={"#guide-inhuman"}>Inhuman</a>
                    </li>
                    <li>
                      <a href={"#guide-unknown"}>Unknown</a>
                    </li>
                  </ol>
                </li>
              </ol>
            </CardContent>
          </Card>
        </section>
        <section id={"why-should-i-buy-a-haunted-home"}>
          <h2>Why should I buy a haunted home?</h2>
          <p>
            Any haunting is an opportunity with potentially endless benefits! If
            you crave a taste of the supernatural, a haunted home is exactly
            what you need to satisfy your curiosity. Alternatively, you can open
            your home to visitors with a bed and breakfast or guided tours!
            Living in a haunted home has also proven to lead to book and movie
            deals!
          </p>
        </section>
        <section id={"types-of-hauntings"} className={"guide-section"}>
          <h2>Types of hauntings</h2>
          <section id={"guide-intelligent"} className={"guide-section"}>
            <h3>Intelligent</h3>
            <p>
              The intelligent spirit is one that's aware they have passed and
              can communicate with the living. They are usually friendly at best
              and mischievous at worst. Their presence can occasionally be felt
              with sounds or smells, but these spirits do not always manifest in
              obvious ways. These hauntings are safe for children and pets.
            </p>
            <h4>Why should I buy a house with an intelligent haunting?</h4>
            <p>
              An intelligent spirit can be a companion to your family, as well
              as offering a taste of the supernatural to curious souls.
              Attractions lend themselves well to intelligent hauntings because
              guests will enjoy their time in your home enough to come back!
            </p>
          </section>
          <section id={"guide-residual"} className={"guide-section"}>
            <h3>Residual</h3>
            <p>
              The residual spirit is not aware they have passed and cannot
              communicate with the living directly. They experienced a violent
              or tragic incident in their life and relive that moment for the
              rest of eternity. These spirits are not usually dangerous, but can
              upset children and pets.
            </p>
            <h4>Why should I buy a house with a residual haunting?</h4>
            <p>
              Residual spirits are not dangerous, merely frightening. Purchasing
              a house with a residual spirit is perfectly safe as long as the
              layout of the home allows you to reach a bathroom quickly.
            </p>
          </section>
          <section id={"guide-poltergeist"} className={"guide-section"}>
            <h3>Poltergeist</h3>
            <p>
              The poltergeist is a spirit which is able to communicate with the
              living. They tend to initiate this communication by knocking on
              walls, moving furniture, and throwing objects. Sometimes a
              poltergeist can appear as an apparition, at which point it is
              advised to leave the property and come back at a later time.
              Poltergeists are typically a manifestation of teenage angst,
              particularly girls, so it is not advised to bring a teenager into
              a home with an active poltergeist. These spirits can be dangerous
              for humans and animals.
            </p>
            <h4>Why should I buy a house with a poltergeist haunting?</h4>
            <p>
              Poltergeists can be a nuisance, but they are unlikely to appear in
              a home with no teenage occupants. You may also be able to handle
              the poltergeist's antics, but make sure that you exercise caution
              due to this spirit's propensity for throwing dangerous objects
              such as knives.
            </p>
          </section>
          <section id={"guide-inhuman"} className={"guide-section"}>
            <h3>Inhuman</h3>
            <p>
              Inhuman spirits are ones which have never been human or which have
              never experienced death but manifest as a spirit-like creature.
              Animals fall under this category as well as any number of
              legendary creatures: angels, demons, fairies, pixies, banshees,
              gnomes, and many others can be considered inhuman spirits. The
              danger of this haunting depends on the type of spirit, and we ask
              property owners to provide more details about the haunting in the
              description box of any new listing.
            </p>
            <h4>Why should I buy a house with an inhuman haunting?</h4>
            <p>
              Not all inhuman hauntings are dangerous, particularly animal
              spirits. Animal spirits are often deceased pets or local wildlife,
              and though they may be aware of you, they are frequently more
              scared of you than you are of them. Any other inhuman spirit can
              be dangerous depending on how it manifests, though many spirits
              are also helpful (like the diminutive brownie) or protective (like
              the fatherly domovoy).
            </p>
          </section>
          <section id={"guide-unknown"} className={"guide-section"}>
            <h3>Unknown</h3>
            <p>
              The "unknown" option on our website is for any listing that
              contains more than one haunting or which is not verifiably
              haunted. For example, a home which does not display any
              supernatural activity but has many stories of the surrounding
              countryside would fall under "unknown." Another listing which may
              fall under "unknown" is one that has both an intelligent and an
              inhuman haunting, such as a previous occupant and their pet.
            </p>
            <h4>Why should I buy a house with multiple hauntings?</h4>
            <p>
              Multiple hauntings are not necessarily any better or worse than a
              single haunting. We ask listing owners to include more details
              about the haunting in their description so that any potential
              buyer may make their own decision about purchasing the property.
            </p>
            <h4>Why should I buy a house with no actual haunting?</h4>
            <p>Why not?</p>
          </section>
        </section>
      </article>
      <BackToTop />
    </>
  );
};

export default Guide;
