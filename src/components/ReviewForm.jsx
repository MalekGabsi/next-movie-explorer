import { useContext } from "react";
import { UserContext } from "@/context/UserContext"; // Import the context
import { supabase } from "@/utils/supabaseClient";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function ReviewForm() {
  const { user } = useContext(UserContext); // Get the user from the context
  const router = useRouter();
  const { id: movie_id } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const rating = parseInt(e.target.rating.value);
    const review = e.target.review.value;

    const { data, error } = await supabase.from("reviews").insert([
      {
        name,
        rating,
        review,
        movie_id,
        user_email: user?.email || null,
      },
    ]);

    if (error) {
      console.error(error);
      toast.error("Failed to submit review.");
    } else {
      console.log("Review submitted:", data);
      toast.success("Review submitted!");
      e.target.reset();
    }
  };

  return (
    <div className="container mx-auto px-6 md:px-12 mt-16">
      <div className="bg-gray-900/80 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-700 max-w-3xl mx-auto">
        <h3 className="text-3xl font-extrabold text-red-500 mb-6 text-center">Leave a Review ⭐</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-1">Your Name</label>
            <input 
              type="text" 
              name="name" 
              id="name" 
              required 
              placeholder={user?.user_metadata?.full_name || "John Doe"} 
              defaultValue={user?.user_metadata?.full_name || "John Doe"} 
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700" 
              readOnly
            />
          </div>

          <div>
            <label htmlFor="rating" className="block text-sm font-semibold text-gray-300 mb-1">Rating (1-10)</label>
            <input 
              type="number" 
              name="rating" 
              id="rating" 
              min="1" 
              max="10" 
              required 
              placeholder="8" 
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700" 
            />
          </div>

          <div>
            <label htmlFor="review" className="block text-sm font-semibold text-gray-300 mb-1">Your Review</label>
            <textarea 
              name="review" 
              id="review" 
              rows="5" 
              required 
              placeholder="Share your thoughts..." 
              className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white placeholder-gray-500 border border-gray-700 resize-none" 
            />
          </div>

          <div className=" flex justify-center">
            <button 
              type="submit" 
              className="cursor-pointer bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
