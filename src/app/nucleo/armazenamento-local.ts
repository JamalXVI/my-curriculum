export const ArmazenamentoLocal = {
    getItem(chave: string): any {
        return JSON.parse(localStorage.getItem(chave));
    },
    setItem(chave: string, valor: any): void {
        localStorage.setItem(chave, JSON.stringify(valor));
    },
    criarAutoItem(chave: string, valorPadrao: any): any {
        const retorno = this.getItem(chave);
        if (!retorno) {
            this.setItem(chave, valorPadrao);
            return this.getItem(chave);
        }
        return retorno;
    },
    removerItem(chave: string) {
        localStorage.removeItem(chave);
    }
};
