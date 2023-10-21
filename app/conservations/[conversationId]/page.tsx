

import getConversationById from "@/app/(site)/actions/getConservationById";
import getMessages from "@/app/(site)/actions/getMessages";
import EmptyState from "@/app/(site)/components/shared/EmptyState";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";

// import Header from "./components/Header";
// import Body from "./components/Body";
// import Form from "./components/Form";

interface IParams {
  conversationId: string;
};

const ConversationId = async ({ params }: { params: IParams }) => {

  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  console.log('AB-> ',conversation)

//   if (!conversation) {
//     return (
//       <div className="lg:pl-80 h-full">
//         <div className="h-full flex flex-col">
//           <EmptyState />
//         </div>
//       </div>
//     );
//   }
  
  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
        <Form />
      </div>
    </div>
  )
};

export default ConversationId;