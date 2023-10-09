import {Container, SectionWrapper} from "@/components";
import Image from 'next/image'

const images = [
    "https://images.unsplash.com/photo-1578937227978-050be101e3a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
    "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    "https://images.unsplash.com/photo-1596392536132-3052ab8a97f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1624880056139-d1212d7ff347?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1605744463330-e431fdc4c5d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2127&q=80",
    "https://images.unsplash.com/photo-1596061343448-3ebc93432ab7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1976&q=80",
    "https://images.unsplash.com/photo-1533922598206-a1a2594e5873?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80"
]


const EchoPage = () => {
    return (
        <Container>
            <SectionWrapper>
                <div className="grid gap-4 grid-cols-3">
                    {
                        images.map((image, index) => (
                            <div
                                key={`image-${index}`}
                                className="bg-white p-4 overflow-hidden cursor-pointer transition-all"
                            >
                                <div className="relative aspect-square mb-4">
                                    <div className="absolute inset-0 z-10"/>
                                    <Image
                                        src={image}
                                        alt="Hello"
                                        fill
                                        className="object-cover object-center point-events-none"
                                    />
                                </div>

                                <div className="flex flex-row justify-between text-neutral-600">
                                    <span>SLEX</span>
                                    <span>2023</span>
                                </div>
                            </div>
                        ))
                    }

                </div>

            </SectionWrapper>
        </Container>
    )
}

export default EchoPage;
