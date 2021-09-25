import { connectToDatabase } from "database/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { pid } = req.query;

  if (req.method === "GET") {
    if (typeof pid === "string") {
      let articles = [
        {
          author: "Curtis Knudson",
          date: "09/24/21",
          title: "Why you should be happy",
          subTitle: "And why it isn't always obvious",
          readTime: "10 minutes",
          content:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam hendrerit dolor non nibh aliquam, et fringilla nulla semper. Nunc velit sem, tempor at tincidunt id, consectetur sit amet purus. Nulla pharetra consectetur purus. Integer ornare lorem nec lacus molestie placerat. Etiam placerat nec tellus luctus gravida. Curabitur in arcu nunc. Sed ac libero a arcu vestibulum finibus. Sed ullamcorper dictum augue placerat egestas. Fusce egestas rhoncus ex, vel fermentum arcu. Nam posuere pulvinar libero id laoreet. Morbi sed tincidunt ante. Suspendisse orci orci, tristique in dictum ac, dignissim sit amet nulla. Nulla facilisi. Suspendisse potenti. Curabitur molestie ligula eu nulla ultricies lacinia eget eget lacus. Mauris commodo dui a laoreet venenatis.",

          url: "why-you-should-be-happy",
        },
      ];
      res.json(articles);
    }
  }
};
