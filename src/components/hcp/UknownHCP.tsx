const UknownHCP = () => {
  return (
    <div>
        <div className="w-full h-[150px] bg-[#f2f2f2] rounded-t-2xl relative mb-15">
            <div className="w-[130px] h-[130px] rounded-[50%] bg-[#ccc] absolute m-auto left-0 right-0 bottom-[-50px] border-4 border-white">
              <img
                src={'/avatars/doc.jpg'}
                alt={'Uknown Doctor'}
                className="w-[100%] rounded-full object-cover"
                />
            </div>
        </div>
        <div className="p-4">
            <div className="rounded-xl text-center border p-3 border-warning-500 bg-warning-50 dark:border-warning-500/30 dark:bg-warning-500/15">
                <p className="text-warning-500 text-sm">Select or search for a doctor to view details.</p>
            </div>
            
        </div>
    </div>
  );
};

export default UknownHCP;
