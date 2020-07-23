export class Societe {

  constructor(public id,
    public nom,
    public idCategorieSociete,
    public description,
    public lieu,
    public dateCreation,
    public email,
    public tel,
    public coordonnee,public points){
  }
}

export class SocieteDesinfection {

  constructor(public id,
    public nom,
    public description,
    public lieu,
    public dateCreation,
    public email,
    public tel,
    public coordonnee){
  }
}

