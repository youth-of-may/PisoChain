export default function Projects() {
    return(
        <>
        <h1 className="font-source text-6xl font-bold text-[#1E4E79] mb-4">Project Listings</h1>
        <p className="w-xl text-center mb-10 font-inter">Lorem ipsum dolor sit amet. Est placeat tenetur ex Quis omnis a tenetur omnis 33 sapiente veritatis est provident galisum ex error odio. </p>
        <div className="w-[75%] flex gap-x-10 justify-center">
            <input
            type="text"
            placeholder="Search..."
            className="w-[75%]"
          />
          <select id="status" name="status">
            <option value="Pending">All</option>
            <option value="Pending">Pending</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          
        </div>
    
        </>
    )
}