const entry = (heading, body, target, value) =>{
    return {
        heading, body, target, value
    }
}

const DATA ={};
DATA.JIRKA = {
    "name": "Jirka",
    "achievements": {
        "FIGURE": {
           "proko_2": {"done":100, "date": "21.4.2019"}
        },
        "PERSPECTIVE": {
            "50Box": {"done":0},
        },
        "MATERIALS": {
            "MUD": {"done": 1},
        },
        "CHARACTER_DESIGN": {
            "50Soldiers": {"done":4}
        }
    }
}

DATA.MARTIN = {
    "name": "Martin",
    "achievements": {
        "PERSPECTIVE": {
            "50Box": {"done":0},
        },
        "MATERIALS": {
            "MUD": {"done": 1},
        },
        "CHARACTER_DESIGN": {
            "50Soldiers": {"done":50},
            "50MedievalMen":{"done":50},
            "50MedievalWomen":{"done":25}
        }
    }
}

const LESSONS = {
    "FIGURE": {
      "heading":"Figurální kresba",
      "body": {
          "proko_2": entry("Proko 2 - Fazole", CONTENT.proko2bean, 100, 0.5),
      }
    },
    "ANATOMY": {
        "heading": "Anatomie",
        "body": {
            "ANATOMY_1": entry("anatomie 1", "lalala", 1),
            "ANATOMY_2": entry("anatomie 2", "lalala", 1),
        }
    },
    "MATERIALS": {
        "heading": "Studie materiálů",
        "body": {
            "MUD": entry("Bahno", "Nakresli 10x studie bahna", 10),
            "RUST": entry("Rez", "Nakresli 10x studie rezu", 10),
        }
    },
    "PERSPECTIVE": {
        "heading": "Perspektiva",
        "body": {
            "50Box": entry("Bahno", "Nakresli 50 krabic", 50),
            "50Cylinder": entry("Rez", "Nakresli 50 valcu", 50),
        }
    },
    "CHARACTER_DESIGN": {
        "heading": "Postavy",
        "body": {
            "50Soldiers": entry("Současná armáda", "Nakresli 50 příslušníků moderní armády", 50),
            "50MedievalMen": entry("Středověk - muži", "Nakresli 50 studií mužů ve středověkém kostýmu", 50),
            "50MedievalWomen": entry("Středověk - ženy", "Nakresli 50 studií žen ve středověkém kostýmu", 50),
        }
    },
    "CREATURE_DESIGN":{
        "heading": "Bytosti",
        "body": {
            "50Box": entry("Bahno", "Nakresli 50 krabic", 50),
            "50Cylinder": entry("Rez", "Nakresli 50 valcu", 50),
        }
    }
};