"use client";
import { useState, useEffect } from "react";
import { BrowserQRCodeReader, BrowserMultiFormatReader } from "@zxing/browser";

export default function Page() {
    const [status, setStatus] = useState<string>("starting");
    const [devices, setDevices] = useState<MediaDeviceInfo[]|null>(null);
    const [result, setResult] = useState<string>("none");

    const codeReader = new BrowserQRCodeReader();

    // Set up camera
    useEffect(() => {
        BrowserQRCodeReader
            .listVideoInputDevices()
            .then(videoInputDevices => {
                setDevices(videoInputDevices);
                // Start decoding continuously (until unexpected error occurs)
                codeReader.decodeFromVideoDevice(videoInputDevices[0].deviceId, "video", (result:any, error) => { // Change video device here
                    setStatus("active")
                    if (result) {
                        setResult(JSON.stringify(result));
                    }
                    if (error) { 
                        // Three types of expected errors: NotFoundException, ChecksumException, FormatException
                    }
                }).catch((error) => { // Catch permission
                    setStatus(error)
                })
            })
            .catch(error => {
                setStatus(error)
            });
    }, []);
    

    // Quit camera feed
    function handleQuit() {
        BrowserMultiFormatReader.releaseAllStreams();
    }

    return (
        <section>
            <p>{`Status: ${status}`}</p>
            <p>{`Devices (first device is active for this demo): ${JSON.stringify(devices)}`}</p>
            <video id="video"/>
            <p>{`Result: ${result}`}</p>
            <button onClick={handleQuit}>Quit camera</button>
        </section>
    );
};