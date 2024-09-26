import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";

export const useCarrinhoContext = () => {
  const { carrinho, setCarrinho } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    setCarrinho((itensCarrinho) => {
      const itemExiste = itensCarrinho.find(
        (item) => item.id === novoProduto.id
      );

      if (itemExiste) {
        return itensCarrinho.map((item) => {
          return item.id === novoProduto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item;
        });
      } else {
        novoProduto.quantidade = 1;
        return [...itensCarrinho, novoProduto];
      }
    });
  }

  function removerProduto(id) {
    setCarrinho((itensCarrinho) => {
      const itemExiste = itensCarrinho.find((item) => item.id === id);

      if (itemExiste) {
        if (itemExiste.quantidade > 1) {
          return itensCarrinho.map((item) => {
            return item.id === id
              ? { ...item, quantidade: item.quantidade - 1 }
              : item;
          });
        } else return itensCarrinho.filter((item) => item.id !== id);
      }
    });
  }

  function removerProdutoCarrinho(id) {
    setCarrinho((itensCarrinho) => {
      const itemExiste = itensCarrinho.find((item) => item.id === id);
      if (itemExiste) {
        return itensCarrinho.filter((item) => item.id !== id);
      }
    });
  }

  function somaValorTotalCarrinho() {
    return carrinho.reduce(
      (acc, item) => acc + item.preco * item.quantidade,
      0
    );
  }

  return {
    carrinho,
    setCarrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    somaValorTotalCarrinho,
  };
};
