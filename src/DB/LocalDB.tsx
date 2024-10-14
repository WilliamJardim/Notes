import Nota from '../interfaces/Nota';

interface dbConfig{
    tableName: string
}

class LocalDB{
    private tableName;

    constructor( cfg:dbConfig ){
        this.tableName = cfg.tableName as string;
    }

    selectAll(): Array<Nota>{
        let tableData:Array<Nota> = JSON.parse(localStorage.getItem( this.tableName )!);
        return tableData;
    }

    find( conteudo:string ): Array<Nota>{
        let registros = this.selectAll();
        
        let filtragem:Nota[] = registros.filter( function(registro:Nota){

            let encontrou:boolean = registro!.conteudo.toLowerCase().trim().indexOf( conteudo.toLowerCase().trim() ) != -1 ||
                                    registro!.titulo.toLowerCase().trim().indexOf( conteudo.toLowerCase().trim() ) != -1;

            if( encontrou == true ){
                return registro as Nota;
            }

        });

        return filtragem;
    }

    /**
    * Retorna o array de notas SEM A NOTA CUJO ID È TAL
    * @param id 
    * @returns 
    */
    deleteById( idDeletar:string ): Array<Nota>{
        let registros = this.selectAll();
        
        let filtragem:Nota[] = registros.filter( function(registro:Nota){

            let vaiDeletar:boolean = registro!.id == idDeletar;
                                     
            if( vaiDeletar == false ){
                return registro as Nota;
            }

        });

        return filtragem;
    }

    /**
     * O ID deve permancecer intacto!
     * 
     * @param novaNotaRef 
     * @returns 
     */
    persistExistantRecord( novaNotaRef:Nota ): boolean{
        let success = false;
        let idNota = novaNotaRef.id;
        let registros:Array<Nota> = this.selectAll();

        let novosRegistros = registros.map(function( registro:Nota, index:number ){
            if( registro.id == idNota ){
                return novaNotaRef;

            }else{
                return registro;
            }
        });

        let novosRegistrosStr:string = JSON.stringify(novosRegistros);

        localStorage.setItem(this.tableName, novosRegistrosStr)

        try{
            success = true;

        }catch(e:any){
            success = false;
        }

        return success;
    }

}

export default LocalDB;