import axios from "axios";
import { ChangeEvent, DragEvent, FormEvent, ReactNode, useEffect, useRef, useState } from "react"
import { MainContext } from "../context/MainContext";

type ReactChildren = {
    children: ReactNode
}

const MainProvider = ({ children } : ReactChildren ) => {

  // State Object for managing Files
  const [files, setFiles] = useState<any>([]);
  // Provider
  const [progressBars, setProgressBars] = useState<number[]>([]);

  // Annotation time timer
  const [timeTaken, setTimeTaken] = useState(0);

  // Observer on the download action
  const [download, setDownload] = useState<boolean>(false)
  // Observer of the response download url
  const [downloadUrl, setDownloadUrl] = useState<string>("")
  // Observer on the annotation event
  const [loading, setLoading] = useState<boolean>(false);
  // Observer on the error event
  const [error, setError] = useState<boolean>(false)
  // Obser on the drag event
  const [dragActive, setDragActive] = useState(false);
  // Reference to the input field
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let timerId: number = 0;
    if (loading) {
      const startTime = window.performance.now();
      timerId = setInterval(() => {
        const endTime = window.performance.now();
        setTimeTaken(endTime - startTime);
      }, 1000);
    } else {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [loading]);
  
  // Handle drag events inside the draggable area
  const handleDrag = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // If we detect that he is dragging over the draggable area
    if (e.type === "dragenter" || e.type === "dragover") {
      // We set that he is draggingin to True
      setDragActive(true);
      // Else we set that he is draggingin to false
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Triggers when file(s) are dropped in the droppable area
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // When the user has dropped and the upmost validation is done, 
    // the we can set the drag to NotActive
    setDragActive(false);
    if (e.dataTransfer!.files && e.dataTransfer!.files[0]) {
      // Create a list of empty File
      let draggedFiles: File[] = [];
      // Add the current dropped files to the list.
      for (let j = 0; j < e.dataTransfer!.files.length; j++) {
        draggedFiles.push(e.dataTransfer!.files[j]);
      }
      // Add the new files drop to the current files Observer
      setFiles((prev: FileList)  => [...prev, ...draggedFiles])
    }
  };
  
  // Triggers when file is selected with click event
  const handleChange = (e: ChangeEvent) => {
    e.preventDefault();
    // If there are files, add them to the current files Observer
    if ((e.target as HTMLInputElement).files && (e.target as HTMLInputElement).files) {
        setFiles((prev: FileList)  => [...prev, ...(e.target as HTMLInputElement).files!])
    }
  };

  // Removes all the files from the current files Observer
  const handleClear = () => {
    setFiles([]);
    setDownloadUrl("")
    setTimeTaken(0)
  }

  /**
   * Removes the selected file from the current files Observer
   * @param lastModified 
   * @param name 
   */
  const handleRemove = (lastModified: number, name: string) => {
    const ancientFiles: File[] = files;
    // Creates a new files list that does not contains the selected file
    const newFiles = ancientFiles.filter((file: File) => file.lastModified != lastModified);
    setFiles(newFiles);
  }

  // Function that will permit us to download the annotated files
  const handleDownload = () => {

  }
  
  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current!.click();
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    // Create a new form object
    const formData = new FormData();
    
    // Add all the files
    for (const file of files) {
      formData.append('files', file);
    }
    
    try {
      // Set the files as sent
      setLoading(true);
      // Sending the files to the backend for annotation  
      const response = await axios.post('https://food-annotator-api.onrender.com/api/v1/csv/read', formData, 
      {
        // Header that specifies the type of data we are send
        // Specifically we say that we are send may form-data objects
        responseType: 'blob',
        headers: { 'Content-Type': 'multipart/form-data' },
      //     onUploadProgress: (progressEvent) => {
      // for (let i = 0; i < files.length; i++) {

      //       const percentCompleted = Math.round((progressEvent.loaded * 100) /  progressEvent.total!);
      //       setProgressBars((prevProgressBars: any) => [
      //         ...prevProgressBars.slice(0, i),
      //         percentCompleted,
      //         ...prevProgressBars.slice(i + 1),
      //       ]);
      //   }
      //     },
      });

      const blob = response.data;
      const downUrl = window.URL.createObjectURL(blob);
      setDownloadUrl(downUrl);
      // Stop the loading event
      setLoading(false)
      // No error found setter
      setError(false)
      // Set the result as downloadable
      setDownload(true)
    } catch (error) {
      setError(true)
      setLoading(false)
      // Set the result as downloadable
      setDownload(false)
      setDownloadUrl("");
      console.log(error);
    }
  }

  const value = {
    files: files,
    setFiles: setFiles,
    progressBars: progressBars,
    setProgressBars: setProgressBars,
    download: download,
    setDownload: setDownload,
    downloadUrl: downloadUrl,
    setDownloadUrl: setDownloadUrl,
    loading: loading,
    setLoading: setLoading,
    timeTaken: timeTaken,
    setTimeTaken: setTimeTaken,
    error: error,
    setError: setError,
    dragActive: dragActive,
    inputFieldRef: inputRef,
    setDragActive: setDragActive,
    handleDragEvent: handleDrag,
    handleDropEvent: handleDrop,
    handleChangeEvent: handleChange,
    handleClearEvent: handleClear,
    handleRemoveEvent: handleRemove,
    handleDownloadEvent: handleDownload,
    onButtonClickEvent: onButtonClick,
    handleSubmitEvent: handleSubmit,
  }
    
    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    );
}

export default MainProvider