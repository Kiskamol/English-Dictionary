const p = p => console.log(p);

      const Input = document.querySelector(".input");
      const Meaning = document.querySelector(".meaning");
      const H2 = document.querySelector(".h2");
      const Word = document.querySelector(".word");
      const Audio = document.querySelector("audio");
      const Img = document.querySelector("img");
      const Syn = document.querySelector(".syn");
      const Example = document.querySelector(".example");

      document.addEventListener('keyup', Enter);
      function  Enter(event) {
        event.key === "Enter" ? getMeaning() : null;
      }

      let print = () => window.print();

      async function getMeaning() {
        try {
          //get image sources from API
          Img.src = `https://source.unsplash.com/400x225/?${Input.value}&sig=1`;
          //get json data from API
          const response = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en_US/${Input.value}`
          );
          //Check if input is null and delete all list if it's exist
          Input.value === "" ? error : null;
          Word.textContent = response.data[0].word;
          const list = document.querySelectorAll("li");
          for (let i = 0; i < 10; i++) {
            if (typeof list[i] != "undefined" && list != null) {
              list[i].remove();
            }
          }
          // find part of speech and definitions from input's user
          const meaningArr = response.data[0]/*.meanings;*/
          const meaningArr2 = response.data;
          for (i = 0; i < meaningArr.length; i++) {
            if (i > 5) {
              break;
            } else {
              const node = document.createElement("LI");
              const textnode = document.createTextNode(
                `${response.data[0].meanings[0].partOfSpeech} : ${response.data[0].meanings[0].definitions[i].definition}`
              );
              node.appendChild(textnode);
              Meaning.appendChild(node);
            }
          }
          // find other part of speech and definitions from input's user if the word has one more definitions
          for (let j = 0; j < meaningArr2.length; j++) {
            const node = document.createElement("LI");
            const textnode = document.createTextNode(
              `${response.data[j].meanings[0].partOfSpeech} : ${response.data[j].meanings[0].definitions[0].definition}`
            );
            node.appendChild(textnode);
            Meaning.appendChild(node);
          }
          document.querySelector(".text").textContent =
            response.data[0].phonetics[0].text;
          Audio.src = response.data[0].phonetics[0].audio;
          const synArr = response.data[0].meanings[0].definitions[0].synonyms;
          // check if the word has synonyms and append to the synonyms's list
          if (
            response.data[0].meanings[0].definitions[0].hasOwnProperty(
              "synonyms"
            )
          ) {
            for (i = 0; i < synArr.length; i++) {
              if (i > 5) {
                break;
              } else {
                const node = document.createElement("LI");
                const textNode = document.createTextNode(
                  response.data[0].meanings[0].definitions[0].synonyms[i]
                );
                node.appendChild(textNode);
                Syn.appendChild(node);
              }
            }
          }
          Example.textContent =
            response.data[0].meanings[0].definitions[0].example;
        } catch (error) {
          //Display when get error
          Img.src =
            "https://media3.giphy.com/media/LndQgvlZD7gqhNhB32/giphy.gif?cid=ecf05e47cl4j11hdm3fqqp0436xhskwruwmyjnev9aqseu5g&rid=giphy.gif";
          Word.textContent =
            "Sorry pal, we couldn't find definitions for the word you were looking for.";
          Meaning.textContent = "";
          H2.textContent = "";
          Audio.textContent = "";
          Syn.textContent = "";
          console.error(error);
        }
      }