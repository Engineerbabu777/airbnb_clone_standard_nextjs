import { useParams } from "next/navigation";
import { useMemo } from "react";



export default function useConservation() {


    const params = useParams();

    const conservationId = useMemo(()=> {
        if(!params?.conservationId) return ''

        return params.conservationId as string;
    },[params?.conservationId]);

    const isOpen = useMemo(() => !!conservationId,[conservationId]);

    return useMemo(() => ({
        isOpen,
        conservationId
    }), [isOpen,conservationId])

}