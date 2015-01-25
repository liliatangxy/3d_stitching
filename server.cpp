#include "server.h"

class ImageHandler {
	public:
		ImageHandler() {}

		bool initialization() {
			return geometry_initialize() && image_loader_initialize();
		}

}
