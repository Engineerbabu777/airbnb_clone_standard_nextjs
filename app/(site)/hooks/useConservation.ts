import { useParams } from "next/navigation";
import { useMemo } from "react";



export default function useConservation() {


    const params = useParams();

    console.log('123-> ',params)
    const conservationId = useMemo(()=> {
        if(!params?.conversationId) return ''

        return params.conversationId as string;
    },[params?.conversationId]);

    const isOpen = useMemo(() => !!conservationId,[conservationId]);

    return useMemo(() => ({
        isOpen,
        conservationId
    }), [isOpen,conservationId])

}