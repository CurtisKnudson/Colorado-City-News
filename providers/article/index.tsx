import React, { useState } from "react";
import makeContextHook from "hooks/makeContextHooks";
import { Article } from "types/article";

export const context = React.createContext<
  [Article, React.Dispatch<React.SetStateAction<Article>>] | undefined
>(undefined);
export const useArticleContext = makeContextHook(context);

const ArticleContext: React.FC = ({ children }) => {
  const [articleData, setArticleData] = useState<Article>({
    author: "",
    date: "",
    title: "",
    subTitle: "",
    image: "",
    readTime: "",
    content: [],
    url: "",
  });

  return (
    <context.Provider value={[articleData, setArticleData]}>
      {children}
    </context.Provider>
  );
};

export default ArticleContext;
